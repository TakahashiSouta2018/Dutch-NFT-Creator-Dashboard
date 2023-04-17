import React, { useState, useCallback } from 'react';
import * as DutchC from './styles';
import NFTCard from '../../cards/nft-card';
import { CreateNftManagementI, NFTI } from '@/types';

const NFTBank0x = () => {
  const [NFTs, setNFTs] = useState<CreateNftManagementI[]>([]);

  const onNFTSelect = useCallback(
    (nftId: string) => {
      const index = NFTs.findIndex((nft) => nft.nftId === nftId);
      const nft = NFTs.find((nft) => nft.nftId === nftId);
      if (nft) {
        setNFTs([
          ...NFTs.slice(0, index),
          {
            ...nft,
          },
          ...NFTs.slice(index + 1),
        ]);
      }
    },
    [NFTs]
  );

  return (
    <div className="grid grid-cols-5 gap-3 mt">
      {typeof NFTs === 'object' &&
        NFTs.map((nft) => (
          <NFTCard
            key={nft.nftId}
            onSelect={() => onNFTSelect(nft.nftId)}
            type="bank0x"
            {...nft}
          />
        ))}
    </div>
  );
};

export default NFTBank0x;
