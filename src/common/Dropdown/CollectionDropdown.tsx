import React, { useEffect, useState } from 'react';

import { Dropdown } from '@/common';
import useCollectionHook from '@/hooks/useCollectionHook';

// types
interface CollectionDropdownI {
  selectedCollectionAddress: string;
  setSelectedCollectionAddress: React.Dispatch<React.SetStateAction<string>>;
};

const CollectionDropdown: React.FC<CollectionDropdownI> = ({ selectedCollectionAddress, setSelectedCollectionAddress }) => {
  const { userCollection, collectionNames } = useCollectionHook();

  const [selectedCollectionName, setSelectedCollectionName] =
    useState<string>('');


  useEffect(() => {
    if (userCollection.length > 0) {
      setSelectedCollectionName(collectionNames[0]);
      setSelectedCollectionAddress(userCollection[0].collectionAddress);
    }
  }, [userCollection.length]);

  const handleSelectCollection = (value: string, index: number) => {
    setSelectedCollectionName(value);
    setSelectedCollectionAddress(userCollection[index].collectionAddress);
  };


  return (
    <Dropdown
      label="Collection"
      value={selectedCollectionName}
      options={collectionNames}
      position="BL"
      onSelect={handleSelectCollection}
    />
  );
};

export default CollectionDropdown;
