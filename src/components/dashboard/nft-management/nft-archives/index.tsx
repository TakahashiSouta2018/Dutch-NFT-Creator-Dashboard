import React, { useState, useCallback } from 'react';

import NFTCard from '../../cards/nft-card';
import { NFTListType } from '@/types';

import * as DutchC from './styles';

const NFTArchives = () => {
  const [NFTs, setNFTs] = useState<NFTListType[]>([
    {
      sr: '001',
      name: 'Red Onion',
      collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
      availableCount: 29,
      mintCount: 1000,
      burned: false,
      nftId:
        '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
      selected: true,
      img: '/images/rice.webp',
    },
    {
      sr: '002',
      name: 'Red Onion',
      collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
      availableCount: 29,
      mintCount: 100,
      burned: false,
      nftId:
        '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b9',
      selected: true,
      img: '/images/rice.webp',
    },
  ]);
  const onNFTSelect = useCallback(
    (nftId: string) => {
      const index = NFTs.findIndex((nft) => nft.nftId === nftId);
      const nft = NFTs.find((nft) => nft.nftId === nftId);
      if (nft) {
        setNFTs([
          ...NFTs.slice(0, index),
          {
            ...nft,
            selected: !nft.selected,
          },
          ...NFTs.slice(index + 1),
        ]);
      }
    },
    [NFTs]
  );

  return (
    <DutchC.NFTArchivesWrapper>
      {NFTs.map((nft) => (
        <NFTCard
          key={nft.nftId}
          type="archives"
          onSelect={() => onNFTSelect(nft.nftId)}
          {...nft}
        />
      ))}
    </DutchC.NFTArchivesWrapper>
  );
};

export default NFTArchives;
