import React, { useState, useCallback, useEffect } from 'react';
import { CreateNftManagementI } from '@/types';
import NFTAllByCard from './NFTAllByCard';
import NFTAllByTable from './NFTALLByTable';
import useNFTManagement from '@/hooks/useNFTManagement';

interface NFTAllProps {
  tableListSwtich: number;
}

const NFTAll: React.FC<NFTAllProps> = ({ tableListSwtich }): JSX.Element => {
  const { getAllNfts } = useNFTManagement();
  const [NFTs, setNFTs] = useState<CreateNftManagementI[]>([]);

  useEffect(() => {
    (async () => {
      const nfts = await getAllNfts();
      if (nfts) {
        setNFTs(nfts);
      }
    })();
  }, []);

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

export default NFTAll;
