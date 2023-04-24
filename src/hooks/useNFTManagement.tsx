import { useAppSelector } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { CreateNftManagementI, UsageStatusEnum, UserListI } from '@/types';
import { shallowEqual } from 'react-redux';
import useCollectionHook from './useCollectionHook';
import { DashboardPageReducerI } from '@/components/dashboard/ducks';
import assert from 'assert';
import { WebAppReducerI } from '@/ducks';

export interface NFTCountI {
  all: number;
  archive: number;
  collection: number;
  list: number;
}

const useNFTManagement = () => {
  const nftManagement = new NFTManagementService();

  const { account } = useAppSelector((state) => {
    const { account } = state.webAppReducer as WebAppReducerI;
    return { account };
  }, shallowEqual);

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } =
      state.dashboardPageReducer as DashboardPageReducerI;
    return { selectedNFTs };
  }, shallowEqual);

  const { getCollectionNameByAddress } = useCollectionHook();

  const syncNft = async (listName: string) => {
    try {
      assert(account, 'account == null');

      const nfts: CreateNftManagementI[] = selectedNFTs
        .filter((selectedNFT) => selectedNFT.nftID)
        .map((selectedNFT) => {
          let properties = [
            {
              key: '',
              value: '',
            },
          ];

          if (
            selectedNFT &&
            selectedNFT.metadata &&
            selectedNFT.metadata.attributes
          ) {
            properties = selectedNFT?.metadata.attributes.map((attribute) => {
              return {
                key: String(attribute.trait_type),
                value: String(attribute.value),
              };
            });
          }

          return {
            collectionAddress: selectedNFT.tokenAddress,
            collectionName: getCollectionNameByAddress(
              selectedNFT.tokenAddress
            ),
            name: String(selectedNFT?.metadata?.name),
            amount: String(selectedNFT.amount),
            nftId: selectedNFT.nftID,
            available:
              selectedNFT && selectedNFT.slots
                ? selectedNFT.slots[0].balance
                : '',
            description: String(selectedNFT?.metadata?.description),
            image: selectedNFT?.metadata?.image,
            listName,
            owner: account,
            properties,
          };
        });

      const { response, data } = await nftManagement.syncNFT(nfts);

      if (data && data.data) return data.data;
      else return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNFTByAvailablity = async (
    user: string,
    amount: number,
    available: number
  ) => {
    try {
      const { response, data } = await nftManagement.getUserNFTByAvailablity(
        user,
        amount,
        available
      );
      if (data && data.data) {
        return data.data.nfts;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNFTByAttribute = async (user: string, value: string) => {
    try {
      const { response, data } = await nftManagement.getUserNFTByAttribute(
        user,
        value
      );
      if (data && data.data) {
        return data.data.nfts;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNFTByCollection = async (
    user: string,
    collectionAddress: string
  ) => {
    try {
      const { response, data } = await nftManagement.getUserNFTByCollection(
        user,
        collectionAddress
      );
      if (data && data.data) {
        return data.data.nfts;
      }
      return null;
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
        return data.data.nfts as CreateNftManagementI[];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNftCount = async (user: string) => {
    try {
      const { response, data } = await nftManagement.getUserNftCount(user);
      if (data && data.data) {
        return data.data.counts as NFTCountI;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUserNFTAttribute = async (user: string) => {
    try {
      const { response, data } = await nftManagement.getAllUserNFTAttribute(
        user
      );
      if (data && data.data) {
        return data.data.attributes;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNftList = async (user: string) => {
    try {
      const { response, data } = await nftManagement.getUserNftList(user);
      if (data && data.data) {
        return data.data.nfts as UserListI[];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCollectionList = async (user: string) => {
    try {
      const { response, data } = await nftManagement.getUserCollectionList(
        user
      );
      if (data && data.data) {
        return data.data.nfts as UserListI[];
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNftId = async (user: string, nftId: string) => {
    try {
      const { response, data } = await nftManagement.getUserNftId(user, nftId);

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
    getUserNftCount,
    getUserCollectionList,
    getUserNFTByAttribute,
    getUserNFTByCollection,
    getAllUserNFTAttribute,
    getUserNFTByAvailablity,
  };
};

export default useNFTManagement;
