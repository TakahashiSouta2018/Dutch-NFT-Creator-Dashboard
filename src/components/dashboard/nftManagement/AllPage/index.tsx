import React, { useState, useCallback } from 'react';
import { CreateNftManagementI } from '@/types';
import NFTAllByCard from './AllByCard';
import NFTAllByTable from './ALLByTable';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { DashboardPageReducerI, setManagementNFTs } from '../../ducks';
import { shallowEqual } from 'react-redux';

interface NFTAllProps {
  tableListSwtich: number;
}

const AllPage: React.FC<NFTAllProps> = ({
  tableListSwtich,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  // const [NFTs, setNFTs] = useState<CreateNftManagementI[]>(listNfts);

  const { managementNFTs } = useAppSelector((state) => {
    const { managementNFTs } =
      state.dashboardPageReducer as DashboardPageReducerI;
    return { managementNFTs };
  }, shallowEqual);

  const onNFTSelect = useCallback(
    (nftId: string) => {
      const index = managementNFTs.findIndex((nft) => nft.nftId === nftId);
      const nft = managementNFTs.find((nft) => nft.nftId === nftId);
      if (nft) {
        dispatch(setManagementNFTs([
          ...managementNFTs.slice(0, index),
          {
            ...nft,
          },
          ...managementNFTs.slice(index + 1),
        ]));
      }
    },
    [managementNFTs]
  );

  if (tableListSwtich)
    return <NFTAllByTable NFTs={managementNFTs} onNFTSelect={onNFTSelect} />;
  else return <NFTAllByCard NFTs={managementNFTs} onNFTSelect={onNFTSelect} />;
};

export default AllPage;
