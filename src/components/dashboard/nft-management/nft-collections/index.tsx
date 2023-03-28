import useNFTManagement from '@/hooks/useNFTManagement';
import { UserListI } from '@/types';
import React, { useState, useEffect } from 'react';

import NFTCollectionCard from '../../cards/nft-collection-card';

import * as DutchC from './styles';

const NFTCollections = () => {
  const [NFTCollections, setNFTCollections] = useState<UserListI[]>([]);

  const { getUserCollectionList } = useNFTManagement();

  useEffect(() => {
    (async () => {
      const lists = await getUserCollectionList();
      if (lists) {
        const userList = lists.map((list) => {
          const imageUrls = list.nfts.map((nft) => nft.image);
          return { ...list, imageUrls };
        });

        setNFTCollections(userList);
      }
    })();
  }, []);

  return (
    <DutchC.NFTCollectionsWrapper>
      {NFTCollections.map((collection, index) => (
        <NFTCollectionCard
          key={index}
          collection={collection}
          onClick={() => console.log('')}
        />
      ))}
    </DutchC.NFTCollectionsWrapper>
  );
};

export default NFTCollections;
