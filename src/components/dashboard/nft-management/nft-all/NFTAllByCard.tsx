import React from 'react';
import * as DutchC from './styles';
import { NFTListType } from '@/types';
import NFTCard from '../../cards/nft-card';
interface NFTAllByCardProps {
  NFTs: NFTListType[];
  onNFTSelect: (nftId: string) => void;
}

const NFTAllByCard: React.FC<NFTAllByCardProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  return (
    <DutchC.NFTCardWrapper>
      {NFTs.map((nft) => (
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
