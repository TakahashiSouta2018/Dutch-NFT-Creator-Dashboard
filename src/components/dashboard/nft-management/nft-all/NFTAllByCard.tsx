import React from 'react';
import * as DutchC from './styles';
import NFTCard from '../../cards/nft-card';
import { CreateNftManagementI } from '@/types';
interface NFTAllByCardProps {
  NFTs: CreateNftManagementI[];
  onNFTSelect: (nftId: string) => void;
}

const NFTAllByCard: React.FC<NFTAllByCardProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  return (
    <DutchC.NFTCardWrapper>
      {typeof NFTs === 'object' &&
        NFTs.map((nft) => (
          <NFTCard
            key={nft.nftId}
            onSelect={() => onNFTSelect(nft.nftId)}
            type="all"
            {...nft}
          />
        ))}
    </DutchC.NFTCardWrapper>
  );
};

export default NFTAllByCard;
