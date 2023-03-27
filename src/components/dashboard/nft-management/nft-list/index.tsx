import React, { useState, useCallback } from 'react';
import { NFTListType } from '@/types';
import NFTListByCard from './NFTListByCard';
import NFTListByTable from './NFTListByTable';

interface NFTListProps {
  tableListSwtich: number;
  nftList: NFTListType[];
  onShowListModal: () => void;
}

const NFTLists: React.FC<NFTListProps> = ({
  tableListSwtich,
  nftList,
  onShowListModal,
}): JSX.Element => {
  const [NFTs, setNFTs] = useState<NFTListType[]>(nftList);
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

  if (tableListSwtich)
    return (
      <NFTListByTable
        NFTs={NFTs}
        onNFTSelect={onNFTSelect}
        onShowListModal={onShowListModal}
      />
    );
  else return <NFTListByCard onShowListModal={onShowListModal} />;
};

export default NFTLists;
