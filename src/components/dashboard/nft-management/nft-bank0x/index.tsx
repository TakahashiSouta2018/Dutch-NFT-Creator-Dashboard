import React, { useState, useCallback } from 'react';
import * as DutchC from './styles';
import NFTCard from '../../cards/nft-card';

type NFTT = {
  id: string;
  title: string;
  image: string;
  unit: string;
  description: string;
  selected: boolean;
};

const NFTBank0x = () => {
  const [NFTs, setNFTs] = useState<NFTT[]>([
    {
      id: '0x4765433235365333463a4d3sf4324sd a3f4d3s54f35ds32f1sd324f534ads35fds2f5a4dfdsfadf',
      title: 'Garlic1',
      image: '/images/rice.webp',
      unit: '29/1000',
      description: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕.',
      selected: false,
    },
    {
      id: '0x24657434676435446ad54f34d57f65ads74f 65746ds7f6ds76f7ds65a7f687ds6f4s6af768sd7f96sdf4a6sd7f6dsf6asd74f8',
      title: 'Garlic2',
      image: '/images/rice.webp',
      unit: '29/1000',
      description:
        '🍎🍌🍍The Fruit Salad Game🍆🥦🥕 Olive trees are special in the Holy Land. The olive branch is universally regarded as a symbol of peace.',
      selected: false,
    },
  ]);
  const onNFTSelect = useCallback(
    (id: string) => {
      const index = NFTs.findIndex((nft) => nft.id === id);
      const nft = NFTs.find((nft) => nft.id === id);
      if (nft) {
        setNFTs([
          ...NFTs.slice(0, index),
          {
            ...nft,
            selected: !nft.selected,
          },
          ...NFTs.slice(index + 1),
        ]);
      }
    },
    [NFTs]
  );

  return (
    <DutchC.NFTBank0xWrapper>
      {NFTs.map((nft) => (
        <NFTCard
          key={nft.id}
          onSelect={() => onNFTSelect(nft.id)}
          type="bank0x"
          {...nft}
        />
      ))}
    </DutchC.NFTBank0xWrapper>
  );
};

export default NFTBank0x;
