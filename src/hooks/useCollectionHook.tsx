import { toast } from 'react-toastify';

import { LoopringService } from '@/lib/LoopringService';
import { pinFileToIPFS } from '@/lib/pinata';
import { useAppSelector } from '@/redux/store';
import { AccountInfoI, CollectionI, CollectionObjectI, NFTI } from '@/types';
import { useRouter } from 'next/router';
import { shallowEqual } from 'react-redux';
import LoopringApi from '@/services/LoopringApi.service';
import { WebAppReducerI } from '@/ducks';
import { DashboardPageReducerI } from '@/components/dashboard/ducks';

const useCollectionHook = () => {
  const { push } = useRouter();
  const loopringService = new LoopringService();
  const loopringApiService = new LoopringApi();

  const { accountInfo, userCollection } = useAppSelector((state) => {
    const { accountInfo, userCollection } = state.webAppReducer;
    return { accountInfo, userCollection };
  }, shallowEqual);

  const createCollection = async (collectionObject: CollectionObjectI) => {
    const imagesUrl = await pinFileToIPFS([
      collectionObject.avatar,
      collectionObject.banner,
      collectionObject.tileUri,
    ]);

    if (!imagesUrl || !accountInfo) {
      return;
    }

    const res = await loopringService.createCollection(accountInfo, {
      ...collectionObject,
      avatar: `ipfs://${imagesUrl[0]}`,
      banner: `ipfs://${imagesUrl[1]}`,
      tileUri: `ipfs://${imagesUrl[2]}`,
    });
    if (res) {
      toast('collection created successfully', { type: 'success' });
      push('/create');
    } else toast('Unable to create collection', { type: 'error' });
  };

  const getUserCollection = async (user: string, apiKey: string) => {
    try {
      const res = await loopringApiService.getUserCollection(user, apiKey);

      console.log({ res });

      if (res?.data?.data?.collections) {
        return res.data.data.collections;
      }

      return [];
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCollectionNFTs = async (user: string, tokensAddress: string) => {
    try {
      const res = await loopringApiService.getUserCollectionNFTs(
        user,
        tokensAddress
      );

      let nfts: NFTI[] = [];

      if (res?.data?.data?.collections) {
        nfts = res.data.data.nfts;
      }

      return nfts;
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionNames = (collections: CollectionI[]) => {
    return collections.map((collection: CollectionI) => collection.name);
  };

  const getCollectionNameByAddress = (collectionAddress: string) => {
    if (collectionAddress) {
      const collection = userCollection.filter(
        (collection: CollectionI) =>
          collection.collectionAddress.toLowerCase() ===
          collectionAddress.toLowerCase()
      );
      if (collection.length > 0) {
        return collection[0].name;
      }
    }
    return '';
  };

  return {
    createCollection,
    getUserCollection,
    getCollectionNames,
    getCollectionNameByAddress,
    getUserCollectionNFTs,
  };
};

export default useCollectionHook;
