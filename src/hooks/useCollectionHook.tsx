import { LoopringService } from '@/lib/LoopringService';
import { pinFileToIPFS } from '@/lib/pinata';
import { useAppSelector } from '@/redux/store';
import { CollectionI, CollectionObjectI } from '@/types';
import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

const useCollectionHook = () => {
  
  const loopringService = new LoopringService();
  const [userCollection, setUserCollection] = useState<CollectionI[]>([]);

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  useEffect(() => {
    (async () => {
      try {
        if (accountInfo) {
          const res = await getUserCollection(0, 100);
          if (res && res.collections) setUserCollection(res.collections);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [accountInfo]);

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

    console.log({ res });

    if (res) alert('collection created successfully');
  };

  const getUserCollection = async (offset: number, limit: number) => {
    try {
      if (!accountInfo) return alert('Account not connected');

      const x = await loopringService.getUserCollection({
        accountInfo,
        offset,
        limit,
        isMintable: true,
      });

      console.log(x);
      return x;
    } catch (error) {
      console.log(error);
    }
  };

  return { userCollection, createCollection, getUserCollection };
};

export default useCollectionHook;
