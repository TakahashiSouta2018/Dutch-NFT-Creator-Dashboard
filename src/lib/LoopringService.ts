import { toast } from 'react-toastify';

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
  CollectionNFTI,
  CollectionObjectI,
  LooseObjectI,
  MintNFTPostDataI,
  NFTI,
  UserCollectionI,
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
      toast(error.message, { type: 'error' });
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
          owner: accountInfo.accInfo.owner,
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

  async getUserCollection({
    accountInfo,
    tokenAddress = undefined,
    offset = undefined,
    limit = undefined,
    isMintable,
  }: UserCollectionI) {
    const collectionRes = await this.userAPI.getUserOwenCollection(
      {
        owner: accountInfo.accInfo.owner,
        tokenAddress,
        isMintable,
        offset,
        limit,
      },
      accountInfo.apiKey
    );

    return collectionRes;
  }

  async getUserNFTCollection({
    accountInfo,
    tokensAddress,
    offset,
    limit,
  }: CollectionNFTI) {
    try {
      const headers = {
        'X-API-KEY': accountInfo.apiKey,
      };

      const res = await axios.get(
        `${
          process.env.NEXT_PUBLIC_LOOPRING_API_URL
        }/user/nft/balances?accountId=${accountInfo.accInfo.accountId.toString()}&tokenAddrs=${tokensAddress.join(
          ','
        )}&offset=${offset}&limit=${limit}`,
        { headers }
      );

      if (res.status === 200 && res.data && res.data.data) {
        const nfts = res.data.data as NFTI[];

        const nftsWithMetadata = await Promise.all(
          nfts.map(async (nft) => {
            const cid = await this.ipfsNftIDToCid(nft.nftId);
            const metadataRes = await axios.get(
              `https://ipfs.loopring.io/ipfs/${cid}`
            );

            if (metadataRes.status === 200 && metadataRes.data) {
              return { ...nft, metadata: metadataRes.data };
            } else return nft;
          })
        );

        return {
          totalNFT: Number(res.data.totalNum),
          nfts: nftsWithMetadata as NFTI[],
        };
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async getInfoForNFTTokens(nftDatas: string[]) {
    const response = await this.nftAPI.getInfoForNFTTokens({
      nftDatas,
    });

    return response;
  }

  async ipfsNftIDToCid(nftID: string) {
    const response = await this.nftAPI.ipfsNftIDToCid(nftID);

    return response;
  }

  async getLayer2Balance(accountInfo: AccountInfoI) {
    const { userBalances } = await this.userAPI.getUserBalances(
      { accountId: accountInfo.accInfo.accountId, tokens: '' },
      accountInfo.apiKey
    );

    return userBalances;
  }

  async getContractNFTMeta(
    tokenAddress: string,
    nftId: string,
    nftType: string
  ) {
    const response = await this.nftAPI.getContractNFTMeta({
      web3: connectProvides.usedWeb3 as unknown as Web3,
      tokenAddress,
      nftId,
      nftType: nftType as unknown as sdk.NFTType,
    });
    return response;
  }

  async getCollectionMeta(accountInfo: AccountInfoI, tokenAddress: string) {
    const collectionRes = await this.getUserCollection({
      accountInfo,
      tokenAddress,
      isMintable: true,
    });

    if (
      (collectionRes &&
        ((collectionRes as sdk.RESULT_INFO).code ||
          (collectionRes as sdk.RESULT_INFO).message)) ||
      !collectionRes.collections.length
    ) {
      toast('Collection is disable to mint', { type: 'info' });
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

    if (!isMetadataValid) return console.log('Invalid Metadata');
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
      `${process.env.NEXT_PUBLIC_LOOPRING_API_URL}/nft/mint`,
      { ...postData },
      { headers }
    );
    return result.data;
  }
}
