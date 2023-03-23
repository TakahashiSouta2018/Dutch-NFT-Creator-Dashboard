import React from 'react';
import * as DutchC from './styles';
import { NFTListType } from '@/types';
import NFTListTable from './NFTListTable';

interface NFTListByTableProps {
  NFTs: NFTListType[];
  onNFTSelect: (nftId: string) => void;
}

const multiNFTs = [
  {
    name: 'Harvest Req.',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    imageUrls: [
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
    ],
  },
  {
    name: 'Something else list name',
    collection: 'Just another collection',
    imageUrls: [
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
    ],
  },
  {
    name: 'Out of names',
    collection: '🍎 Just not red apples',
    imageUrls: ['/images/rice.webp', '/images/rice.webp', '/images/rice.webp'],
  },
];

const NFTListByTable: React.FC<NFTListByTableProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  return <NFTListTable nftMultiList={multiNFTs} />;
};

export default NFTListByTable;
