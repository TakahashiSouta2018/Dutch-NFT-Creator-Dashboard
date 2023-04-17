import React from 'react';
import { CreateNftManagementI } from '@/types';
import NFTCard from '../shared/NFTCards/nft-card';
interface NFTAllByCardProps {
  NFTs: CreateNftManagementI[];
  onNFTSelect: (nftId: string) => void;
}

const NFTAllByCard: React.FC<NFTAllByCardProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {NFTs.map((nft) => (
        <NFTCard
          key={nft.nftId}
          onSelect={() => onNFTSelect(nft.nftId)}
          type="all"
          {...nft}
        />
      ))}
    </div>
  );
};

export default NFTAllByCard;
