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
          <div key={nft.nftId} className="w-[230px] h-[230px]">
            <div className="bg-gray-300 w-full h-full" />
            <NFTCard
              onSelect={() => onNFTSelect(nft.nftId)}
              type="all"
              {...nft}
            />
          </div>
        ))}
    </DutchC.NFTCardWrapper>
  );
};

export default NFTAllByCard;
