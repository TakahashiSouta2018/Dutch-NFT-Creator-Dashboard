import { LoopringService } from '@/lib/LoopringService';
import { useAppSelector } from '@/redux/store';
import DraftNFTService from '@/services/DraftNFTService';
import { DraftNFTI } from '@/types';
import { shallowEqual } from 'react-redux';

const useNFTHook = () => {
  const draftNFTService = new DraftNFTService();

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  const createDraftNFT = async (draftNFT: Omit<DraftNFTI, 'owner'>) => {
    try {
      if (!accountInfo) return alert('Account not connected');
      const { response, data } = await draftNFTService.createDraftNFT({
        ...draftNFT,
        owner: accountInfo?.accInfo.owner,
      });
      if (data.data) {
        alert('Draft saved successfully');
      }
      console.log({ response, data });
    } catch (error) {
      console.log(error);
    }
  };

  return { createDraftNFT };
};

export default useNFTHook;
