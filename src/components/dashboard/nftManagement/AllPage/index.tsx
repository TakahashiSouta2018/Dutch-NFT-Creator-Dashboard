import React, { useState, useCallback } from 'react';
import { CreateNftManagementI } from '@/types';
import NFTAllByCard from './AllByCard';
import NFTAllByTable from './ALLByTable';

interface NFTAllProps {
  tableListSwtich: number;
  listNfts: CreateNftManagementI[];
}

const AllPage: React.FC<NFTAllProps> = ({
  tableListSwtich,
  listNfts,
}): JSX.Element => {
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

  if (tableListSwtich)
    return <NFTAllByTable NFTs={NFTs} onNFTSelect={onNFTSelect} />;
  else return <NFTAllByCard NFTs={NFTs} onNFTSelect={onNFTSelect} />;
};

export default AllPage;
