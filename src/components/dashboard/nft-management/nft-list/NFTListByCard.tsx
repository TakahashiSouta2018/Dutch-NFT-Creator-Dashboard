import React from 'react';
import NFTMultiCard from '../../cards/nft-multi-card';

const multiCard = [
  {
    name: 'Harvest Req.',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    imageUrls: [
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
    ],
  },
  {
    name: 'Something else list name',
    collection: 'Just another collection',
    imageUrls: [
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
      '/images/rice.webp',
    ],
  },
  {
    name: 'Out of names',
    collection: '🍎 Just not red apples',
    imageUrls: ['/images/rice.webp', '/images/rice.webp', '/images/rice.webp'],
  },
];

const NFTListByCard: React.FC = (): JSX.Element => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {multiCard.map((card, i) => (
        <NFTMultiCard
          key={i}
          imageUrls={card.imageUrls}
          name={card.name}
          collection={card.collection}
          className="grid-cols-2"
        />
      ))}
    </div>
  );
};

export default NFTListByCard;
