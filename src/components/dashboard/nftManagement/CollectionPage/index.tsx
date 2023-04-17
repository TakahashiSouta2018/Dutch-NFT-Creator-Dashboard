import useNFTManagement from '@/hooks/useNFTManagement';
import { UserListI } from '@/types';
import React, { useState, useEffect } from 'react';


import NFTCollectionCard from '../shared/NFTCards/nft-collection-card';

interface PropsI {
  listNfts: UserListI[];
}

const CollectionPage = ({ listNfts }: PropsI) => {
  const [NFTCollections, setNFTCollections] = useState<UserListI[]>(listNfts);

  return (
    <div className='grid grid-cols-5 gap-4'>
      {NFTCollections.map((collection, index) => (
        <NFTCollectionCard
          key={index}
          collection={collection}
          onClick={() => console.log('')}
        />
      ))}
    </div>
  );
};

export default CollectionPage;
