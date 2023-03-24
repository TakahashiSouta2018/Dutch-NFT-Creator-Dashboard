import { LoopringService } from '@/lib/LoopringService';
import { pinFileToIPFS } from '@/lib/pinata';
import { useAppSelector } from '@/redux/store';
import { CollectionI, CollectionObjectI } from '@/types';
import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

const useCollectionHook = () => {
  const loopringService = new LoopringService();
  const [userCollection, setUserCollection] = useState<CollectionI[]>([]);
  const [collectionNames, setCollectionNames] = useState<string[]>([]);

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  useEffect(() => {
    (async () => {
      try {
        if (accountInfo) {
          const res = await getUserCollection(0, 100);
          if (res && res.collections) {
            const collectionNames = res.collections.map(
              (collection: CollectionI) => collection.name
            );
            setCollectionNames(collectionNames);
            setUserCollection(res.collections);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  },[]);

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
    if (res) alert('collection created successfully');
  };

  const getUserCollection = async (offset: number, limit: number) => {
    try {
      if (!accountInfo) return alert('Account not connected');

      const data = await loopringService.getUserCollection({
        accountInfo,
        offset,
        limit,
        isMintable: true,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    userCollection,
    collectionNames,
    createCollection,
    getUserCollection,
  };
};

export default useCollectionHook;
