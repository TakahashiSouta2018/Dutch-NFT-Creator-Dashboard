import { UserListI } from '@/types';
import React from 'react';
import NFTMultiCard from '../shared/NFTCards/nft-multi-card';

interface NFTListByCardProps {
  onShowListModal: () => void;
  multiNFTs: UserListI[];
}

const NFTListByCard: React.FC<NFTListByCardProps> = ({
  multiNFTs,
  onShowListModal,
}): JSX.Element => {  
  return (
    <div className="grid grid-cols-5 gap-3">
      {multiNFTs.map((card, i) => (
        <NFTMultiCard
          key={i}
          imageUrls={card.imageUrls}
          name={card.listName}
          collection={card.collectionName}
          className="grid-cols-2"
          onShowListModal={onShowListModal}
        />
      ))}
    </div>
  );
};

export default NFTListByCard;
