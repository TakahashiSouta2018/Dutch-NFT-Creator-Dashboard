import { connectProvides } from '@loopring-web/web3-provider';
import * as sdk from '@loopring-web/loopring-sdk';
import Web3 from 'web3';
import {
  ChainId,
  CollectionMeta,
  ConnectorNames,
  NFTCounterFactualInfo,
} from '@loopring-web/loopring-sdk';
import { AccountInfoI, CollectionObjectI, FeeI, LooseObjectI } from '@/types';
import { getTimestampDaysLater, TOKEN_INFO } from '@/utils/helper';
import validateMetadata from '@/utils/validateMetadata';
import { pinJSONToIPFS } from './pinata';

interface MintNFTI {
  accountInfo: AccountInfoI;
  collectionMeta: sdk.CollectionMeta;
  walletType: ConnectorNames;
  metadata: LooseObjectI;
  amount: string;
  royaltyPercentage: number;
  fee: FeeI;
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
        collectionMeta,
        fee,
        royaltyPercentage,
        amount,
        walletType,
      } = params;
      const isMetadataValid = validateMetadata(metadata);

      if (!isMetadataValid) {
        return alert('Invalid Metadata');
      }

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
          sellTokenId: TOKEN_INFO.tokenMap['LRC'].tokenId,
        },
        accountInfo.apiKey
      );

      const nftId = this.nftAPI.ipfsCid0ToNftID(metadataCID);

      const response = await this.userAPI.submitNFTMint({
        request: {
          maxFee: {
            tokenId: TOKEN_INFO.tokenMap['LRC'].tokenId,
            amount: fee.fees['LRC'].fee ?? '9400000000000000000',
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
        },
        //@ts-ignore
        web3: connectProvides.usedWeb3 as unknown as Web3,
        chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) as ChainId,
        walletType,
        eddsaKey: accountInfo.eddsaKey.sk,
        apiKey: accountInfo.apiKey,
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
