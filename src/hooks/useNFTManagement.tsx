import { toast } from 'react-toastify';
import { useAppSelector } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { AccountInfoI, UsageStatusEnum, UserListI } from '@/types';
import { shallowEqual } from 'react-redux';

const useNFTManagement = () => {
  const nftManagement = new NFTManagementService();

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } = state.dashboardPageReducer;
    return { selectedNFTs };
  }, shallowEqual);

  const syncNft = async (listName: string) => {
    if (!accountInfo) {
      toast('Account not connected', { type: 'error' });
      return null;
    }

    await Promise.all(
      selectedNFTs.map(async (selectedNFT) => {
        const nft = {
          collectionAddress: selectedNFT?.collectionInfo?.collectionAddress,
          collectionName: String(selectedNFT?.collectionInfo?.name),
          name: String(selectedNFT?.metadata?.name),
          amount: selectedNFT.total,
          nftId: selectedNFT.nftId,
          description: String(selectedNFT?.metadata?.description),
          nftData: selectedNFT.nftData,
          image: selectedNFT?.metadata?.image,
          listName,
        };
        const { response, data } = await nftManagement.syncNFT({
          ...nft,
          owner: accountInfo?.accInfo.owner,
          accountId: String(accountInfo?.accInfo.accountId),
        });

        console.log({ response, data });

        if (data && data.data) return data.data;
        else return null;
      })
    );
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
