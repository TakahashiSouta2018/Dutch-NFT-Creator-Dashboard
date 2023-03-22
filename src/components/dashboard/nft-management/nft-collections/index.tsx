import React, { useState, useCallback } from 'react';

import NFTCollectionCard from '../../cards/nft-collection-card';

import * as DutchC from './styles';

type NFTT = {
  id: string;
  title: string;
  image: string;
  amount: number;
  onClick?: () => void;
};

const NFTCollections = () => {
  const [NFTCollections, setNFTCollections] = useState<NFTT[]>([
    {
      id: '0x4765433235365333463a4d3sf4324sd a3f4d3s54f35ds32f1sd324f534ads35fds2f5a4dfdsfadf',
      title: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
      image: '/images/rice.webp',
      amount: 93,
    },
    {
      id: '0x24657434676435446ad54f34d57f65ads74f 65746ds7f6ds76f7ds65a7f687ds6f4s6af768sd7f96sdf4a6sd7f6dsf6asd74f8',
      title: 'Rabbit Stories 🥕 ',
      image: '/images/rice.webp',
      amount: 19,
    },
  ]);

  return (
    <DutchC.NFTCollectionsWrapper>
      {NFTCollections.map((collection) => (
        <NFTCollectionCard
          key={collection.id}
          {...collection}
          onClick={collection.onClick}
        />
      ))}
    </DutchC.NFTCollectionsWrapper>
  );
};

export default NFTCollections;
