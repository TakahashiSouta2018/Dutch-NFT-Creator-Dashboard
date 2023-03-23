import React from 'react';
import * as DutchC from './styles';
import { NFTListType } from '@/types';
import NFTCard from '../../cards/nft-card';
interface NFTListByCardProps {
  NFTs: NFTListType[];
  onNFTSelect: (nftId: string) => void;
}

const NFTListByCard: React.FC<NFTListByCardProps> = ({
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

export default NFTListByCard;
