import { useAppDispatch, useAppSelector } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { CreateNftManagementI, UserListI } from '@/types';
import { shallowEqual } from 'react-redux';

const useNFTManagement = () => {
  const dispatch = useAppDispatch();
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
    if (!accountInfo) return alert('Account not connected');

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

  const getAllNfts = async () => {
    try {
      if (!accountInfo) return alert('Account not connected');
      const { response, data } = await nftManagement.getAllNFT(
        accountInfo?.accInfo.owner
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
      if (!accountInfo) return alert('Account not connected');
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

  const getUserNftId = async (nftId: string) => {
    try {
      if (!accountInfo) return alert('Account not connected');
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
    getAllNfts,
    getUserNftId,
    getUserNftList,
  };
};

export default useNFTManagement;
