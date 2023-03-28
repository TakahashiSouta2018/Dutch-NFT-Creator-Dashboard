import React, { useState, useCallback, useEffect } from 'react';

import NFTCard from '../../cards/nft-card';
import { CreateNftManagementI, NFTI, UsageStatusEnum } from '@/types';

import * as DutchC from './styles';
import useNFTManagement from '@/hooks/useNFTManagement';

const NFTArchives = () => {

  const { getUserNfts } = useNFTManagement();
  const [NFTs, setNFTs] = useState<CreateNftManagementI[]>([]);

  useEffect(() => {
    (async () => {
      const nfts = await getUserNfts(UsageStatusEnum.ARCHIVED);
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
