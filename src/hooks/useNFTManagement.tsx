import { toast } from 'react-toastify';
import { useAppSelector } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { UsageStatusEnum, UserListI } from '@/types';
import { shallowEqual } from 'react-redux';
import useCollectionHook from './useCollectionHook';
import { DashboardPageReducerI } from '@/components/dashboard/ducks';

const useNFTManagement = () => {
  const nftManagement = new NFTManagementService();

  const { accountInfo, account } = useAppSelector((state) => {
    const { accountInfo, account } = state.webAppReducer;
    return { accountInfo, account };
  }, shallowEqual);

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } =
      state.dashboardPageReducer as DashboardPageReducerI;
    return { selectedNFTs };
  }, shallowEqual);

  const { getCollectionNameByAddress } = useCollectionHook();

  const syncNft = async (listName: string) => {
    try {
      const nfts = selectedNFTs.map((selectedNFT) => {
        return {
          collectionAddress: selectedNFT.tokenAddress,
          collectionName: getCollectionNameByAddress(selectedNFT.tokenAddress),
          name: String(selectedNFT?.metadata?.name),
          amount: selectedNFT.amount,
          nftId: selectedNFT.nftID,
          description: String(selectedNFT?.metadata?.description),
          image: selectedNFT?.metadata?.image,
          listName,
          owner: account,
        };
      });

      const { response, data } = await nftManagement.syncNFT(nfts);

      if (data && data.data) return data.data;
      else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNfts = async (user: string, isArchived: UsageStatusEnum) => {
    try {
      const { response, data } = await nftManagement.getUserNfts(
        user,
        isArchived
      );
      if (data && data.data) {
        return data.data.nfts;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNftList = async () => {
    try {
      if (!accountInfo) {
        toast('Account not connected', { type: 'error' });
        return null;
      }
      const { response, data } = await nftManagement.getUserNftList(
        accountInfo?.accInfo.owner
      );
      if (data && data.data) {
        return data.data.nfts as UserListI[];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCollectionList = async () => {
    try {
      if (!accountInfo) {
        toast('Account not connected', { type: 'error' });
        return null;
      }
      const { response, data } = await nftManagement.getUserCollectionList(
        accountInfo?.accInfo.owner
      );
      if (data && data.data) {
        return data.data.nfts as UserListI[];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNftId = async (nftId: string) => {
    try {
      if (!accountInfo)
        return toast('Account not connected', { type: 'error' });
      const { response, data } = await nftManagement.getUserNftId(
        accountInfo?.accInfo.owner,
        nftId
      );

      console.log(data.data);

      if (data && data.data && data.data.nfts.length > 0) {
        return data.data.nfts;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    syncNft,
    getUserNfts,
    getUserNftId,
    getUserNftList,
    getUserCollectionList,
  };
};

export default useNFTManagement;
