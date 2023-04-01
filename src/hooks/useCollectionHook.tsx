import { toast } from 'react-toastify';

import { LoopringService } from '@/lib/LoopringService';
import { pinFileToIPFS } from '@/lib/pinata';
import { useAppSelector } from '@/redux/store';
import { AccountInfoI, CollectionI, CollectionObjectI } from '@/types';
import { useRouter } from 'next/router';
import { shallowEqual } from 'react-redux';

const useCollectionHook = () => {
  const { push } = useRouter();
  const loopringService = new LoopringService();

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
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

  const getUserCollection = async (accInfo: AccountInfoI) => {
    try {
      const limit = 50;
      let offset = 0;
      let totalUserCollection = null;

      const collections: CollectionI[] = [];

      let res = await loopringService.getUserCollection({
        accountInfo: accInfo,
        offset,
        limit,
        isMintable: true,
      });

      if (res && res.collections) {
        totalUserCollection = Number(res.totalNum);
        collections.push(...res.collections);

        for (let i = 0; i < totalUserCollection; i++) {
          if (collections.length === totalUserCollection) break;
          offset = (i + 1) * limit;

          res = await loopringService.getUserCollection({
            accountInfo: accInfo,
            offset,
            limit,
            isMintable: true,
          });

          if (res && res.collections && res.collections.length > 0)
            collections.push(...res.collections);
          else break;
        }
      }

      return { collections, totalUserCollection };
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionNames = (collections: CollectionI[]) => {
    return collections.map((collection: CollectionI) => collection.name);
  };

  return {
    createCollection,
    getUserCollection,
    getCollectionNames,
  };
};

export default useCollectionHook;
