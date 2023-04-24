import { toast } from 'react-toastify';
import {
  setDraftNFTs,
  setMintModalActiveStep,
  setMintModalIsOpen,
  setSelectedDraftNFTs,
} from '@/components/create/ducks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import DraftNFTService from '@/services/DraftNFTService.service';
import { DraftNFTI } from '@/types';
import { shallowEqual } from 'react-redux';
import { WebAppReducerI } from '@/ducks';
import assert from 'assert';

const useNFTHook = () => {
  const dispatch = useAppDispatch();
  const draftNFTService = new DraftNFTService();

  const { account } = useAppSelector((state) => {
    const { account } = state.webAppReducer as WebAppReducerI;
    return { account };
  }, shallowEqual);

  const createDraftNFT = async (draftNFT: Omit<DraftNFTI, 'owner'>) => {
    try {
      assert(account, 'account === null');

      const { response, data } = await draftNFTService.createDraftNFT({
        ...draftNFT,
        owner: account,
      });
      if (data && data.data) return data.data;
      else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDraftNFT = async (id: number) => {
    try {
      assert(account, 'account === null');

      const { response, data } = await draftNFTService.deleteDraftNFT({
        id,
        ownerAddress: account,
      });
      if (data && data.data) return data.data;
      else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionDraftNFT = async (collectionAddress: string) => {
    try {
      assert(account, 'account === null');

      const { response, data } = await draftNFTService.getCollectionDraftNFT(
        collectionAddress,
        account
      );

      console.log({ dfdffd: data });

      if (data && data.data) {
        return data.data.nft;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  };

  const onMintModalClose = async (collectionAddress: string) => {
    const nft = await getCollectionDraftNFT(collectionAddress);
    if (nft) {
      dispatch(setDraftNFTs(nft));
    }

    dispatch(setMintModalActiveStep(0));
    dispatch(setMintModalIsOpen(false));
    dispatch(setSelectedDraftNFTs([]));
  };

  return {
    createDraftNFT,
    getCollectionDraftNFT,
    deleteDraftNFT,
    onMintModalClose,
  };
};

export default useNFTHook;
