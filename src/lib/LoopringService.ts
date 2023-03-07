import { connectProvides } from '@loopring-web/web3-provider';
import * as sdk from '@loopring-web/loopring-sdk';
import Web3 from 'web3';
import {
  ChainId,
  CollectionMeta,
  ConnectorNames,
  NFTCounterFactualInfo,
} from '@loopring-web/loopring-sdk';
import {
  AccountInfoI,
  CollectionObjectI,
  LooseObjectI,
  MintNFTPostDataI,
} from '@/types';
import { validateMetadata } from '@/lib/metadata';
import { pinJSONToIPFS } from './pinata';
import { getTimestampDaysLater, TOKEN_INFO } from '@/helpers';
import axios from 'axios';

interface MintNFTI {
  accountInfo: AccountInfoI;
  nftTokenAddress: string;
  walletType: ConnectorNames;
  metadata: LooseObjectI;
  amount: string;
  royaltyPercentage: number;
}

export class LoopringService {
  exchangeAPI: sdk.ExchangeAPI;
  userAPI: sdk.UserAPI;
  nftAPI: sdk.NFTAPI;

  constructor() {
    this.exchangeAPI = new sdk.ExchangeAPI({
      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    });
    this.userAPI = new sdk.UserAPI({
      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    });
    this.userAPI = new sdk.UserAPI({
      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    });
    this.nftAPI = new sdk.NFTAPI({
      chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    });
  }

  async unlockAccount(ownerAddress: string, walletType: ConnectorNames) {
    try {
      const { accInfo } = await this.exchangeAPI.getAccount({
        owner: ownerAddress,
      });

      if (!accInfo) return null;

      const { exchangeInfo } = await this.exchangeAPI.getExchangeInfo();

      let keySeed = sdk.GlobalAPI.KEY_MESSAGE.replace(
        '${exchangeAddress}',
        exchangeInfo.exchangeAddress
      ).replace('${nonce}', (accInfo.nonce - 1).toString());

      const eddsaKey = await sdk.generateKeyPair({
        web3: connectProvides.usedWeb3 as unknown as Web3,
        address: accInfo.owner,
        keySeed,
        walletType,
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        counterFactualInfo: undefined,
      });

      const { apiKey } = await this.userAPI.getUserApiKey(
        { accountId: accInfo.accountId },
        eddsaKey.sk
      );

      return { accInfo, eddsaKey, apiKey };
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  }

  async createCollection(
    accountInfo: AccountInfoI,
    collectionobj: CollectionObjectI
  ) {
    try {
      const response = await this.userAPI.submitNFTCollection(
        {
          name: collectionobj.name,
          tileUri: collectionobj.tileUri,
          description: collectionobj.description,
          owner: collectionobj.owner,
          avatar: collectionobj.avatar,
          banner: collectionobj.banner,
          nftFactory:
            sdk.NFTFactory_Collection[
              Number(process.env.NEXT_PUBLIC_CHAIN_ID) as ChainId
            ],
        },
        Number(process.env.NEXT_PUBLIC_CHAIN_ID),
        accountInfo.apiKey,
        accountInfo.eddsaKey.sk
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getCollectionMeta(accountInfo: AccountInfoI, nftTokenAddress: string) {
    const collectionRes = await this.userAPI.getUserOwenCollection(
      {
        owner: accountInfo.accInfo.owner,
        tokenAddress: nftTokenAddress,
        isMintable: true,
      },
      accountInfo.apiKey
    );

    if (
      (collectionRes &&
        ((collectionRes as sdk.RESULT_INFO).code ||
          (collectionRes as sdk.RESULT_INFO).message)) ||
      !collectionRes.collections.length
    ) {
      alert('Collection is disable to mint');
      return null;
    }

    const collectionMeta = (collectionRes as any)
      .collections[0] as CollectionMeta;

    return collectionMeta;
  }

  async getNFTOffchainFeeAmt(
    accountInfo: AccountInfoI,
    collectionMeta: sdk.CollectionMeta
  ) {
    const fee = await this.userAPI.getNFTOffchainFeeAmt(
      {
        accountId: accountInfo.accInfo.accountId,
        tokenAddress: collectionMeta.contractAddress,
        requestType: sdk.OffchainNFTFeeReqType.NFT_MINT,
      },
      accountInfo.apiKey
    );

    return fee;
  }

  async mintNFT(params: MintNFTI) {
    try {
      const {
        metadata,
        accountInfo,
        nftTokenAddress,
        royaltyPercentage,
        amount,
        walletType,
      } = params;
      const isMetadataValid = validateMetadata(metadata);
      const collectionMeta = await this.getCollectionMeta(
        accountInfo,
        nftTokenAddress
      );

      if (!isMetadataValid) return alert('Invalid Metadata');
      if (!collectionMeta) return;

      const fee = await this.getNFTOffchainFeeAmt(accountInfo, collectionMeta);

      const metadataCID = await pinJSONToIPFS(metadata);

      const { exchangeInfo } = await this.exchangeAPI.getExchangeInfo();

      const counterFactualNftInfo: NFTCounterFactualInfo = {
        nftOwner: accountInfo.accInfo.owner,
        nftFactory:
          collectionMeta.nftFactory ??
          sdk.NFTFactory_Collection[
            Number(process.env.NEXT_PUBLIC_CHAIN_ID) as ChainId
          ],
        nftBaseUri: collectionMeta.baseUri,
      };

      const storageId = await this.userAPI.getNextStorageId(
        {
          accountId: accountInfo.accInfo.accountId,
          sellTokenId: TOKEN_INFO.tokenMap['ETH'].tokenId,
        },
        accountInfo.apiKey
      );

      const nftId = this.nftAPI.ipfsCid0ToNftID(metadataCID);

      const request = {
        maxFee: {
          tokenId: TOKEN_INFO.tokenMap['ETH'].tokenId,
          amount: fee.fees['ETH'].fee,
        },
        exchange: exchangeInfo.exchangeAddress,
        minterId: accountInfo.accInfo.accountId,
        minterAddress: accountInfo.accInfo.owner,
        toAccountId: accountInfo.accInfo.accountId,
        toAddress: accountInfo.accInfo.owner,
        tokenAddress: collectionMeta.contractAddress,
        validUntil: getTimestampDaysLater(30),
        storageId: storageId.offchainId,
        counterFactualNftInfo,
        forceToMint: false,
        royaltyPercentage,
        nftType: 0, // ERC1155
        nftId,
        amount,
      };

      const eddsaSignature = sdk.get_EddsaSig_NFT_Mint(
        //@ts-ignore
        { ...request },
        accountInfo.eddsaKey.sk
      );

      const postData: MintNFTPostDataI = {
        ...request,
        creatorFeeBips: 0,
        eddsaSignature: eddsaSignature.result,
        royaltyAddress: collectionMeta.contractAddress,
      };

      const headers = {
        'X-API-KEY': accountInfo.apiKey,
      };

      const result = await axios.post(
        'https://api3.loopring.io/api/v3/nft/mint',
        { ...postData },
        { headers }
      );

      console.log({ result: result.data });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}
