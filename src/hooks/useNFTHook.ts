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

const useNFTHook = () => {
  const dispatch = useAppDispatch();
  const draftNFTService = new DraftNFTService();

  const { accountInfo, account } = useAppSelector((state) => {
    const { accountInfo, account } = state.webAppReducer;
    return { accountInfo, account };
  }, shallowEqual);

  const createDraftNFT = async (draftNFT: Omit<DraftNFTI, 'owner'>) => {
    try {
      if (!accountInfo)
        return toast('Account not connected', { type: 'error' });
      const { response, data } = await draftNFTService.createDraftNFT({
        ...draftNFT,
        owner: accountInfo?.accInfo.owner,
      });
      if (data && data.data) return data.data;
      else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDraftNFT = async (id: number) => {
    try {
      if (!accountInfo)
        return toast('Account not connected', { type: 'error' });
      const { response, data } = await draftNFTService.deleteDraftNFT({
        id,
        ownerAddress: accountInfo?.accInfo.owner,
      });
      if (data && data.data) return data.data;
      else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getCollectionDraftNFT = async (collectionAddress: string) => {
    try {
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
