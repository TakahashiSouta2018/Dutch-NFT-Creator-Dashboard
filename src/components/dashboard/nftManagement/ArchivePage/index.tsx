import React, { useState, useCallback } from 'react';

import { CreateNftManagementI } from '@/types';

import NFTCard from '../shared/NFTCards/nft-card';

interface PropsI {
  listNfts: CreateNftManagementI[];
}

const ArchivePage = ({ listNfts }: PropsI) => {
  const [NFTs, setNFTs] = useState<CreateNftManagementI[]>(listNfts);

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
    <div className='grid grid-cols-5 gap-4'>
      {NFTs.map((nft) => (
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
