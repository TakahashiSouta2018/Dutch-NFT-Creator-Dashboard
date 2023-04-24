import React, { useCallback } from 'react';

import NFTCard from '../shared/NFTCards/nft-card';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { DashboardPageReducerI, setManagementNFTs } from '../../ducks';
import { shallowEqual } from 'react-redux';

const ArchivePage = () => {
  const dispatch = useAppDispatch();

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
        dispatch(
          setManagementNFTs([
            ...managementNFTs.slice(0, index),
            {
              ...nft,
            },
            ...managementNFTs.slice(index + 1),
          ])
        );
      }
    },
    [managementNFTs]
  );

  return (
    <div className="grid grid-cols-5 gap-4">
      {managementNFTs.map((nft) => (
        <NFTCard
          key={nft.nftId}
          type="archives"
          onSelect={() => onNFTSelect(nft.nftId)}
          {...nft}
        />
      ))}
    </div>
  );
};

export default ArchivePage;
