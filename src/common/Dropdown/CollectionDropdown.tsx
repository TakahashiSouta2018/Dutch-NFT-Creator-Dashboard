import React, { useEffect, useState } from 'react';

import { Dropdown } from '@/common';
import useCollectionHook from '@/hooks/useCollectionHook';
import {
  setCollectionNfts,
  setSelectedNfts,
} from '@/components/dashboard/ducks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { WebAppReducerI } from '@/ducks';

// types
interface CollectionDropdownI {
  selectedCollectionAddress: string;
  setSelectedCollectionAddress: React.Dispatch<React.SetStateAction<string>>;
}

const CollectionDropdown: React.FC<CollectionDropdownI> = ({
  selectedCollectionAddress,
  setSelectedCollectionAddress,
}) => {
  const dispatch = useAppDispatch();

  const { getCollectionNames, getUserCollectionNFTs } = useCollectionHook();

  const [selectedCollectionName, setSelectedCollectionName] = useState<string>(
    'No collection found'
  );

  const { account, userCollection } = useAppSelector((state) => {
    const { account, userCollection } = state.webAppReducer as WebAppReducerI;
    return { account, userCollection };
  }, shallowEqual);

  const collectionNames = getCollectionNames(userCollection);

  useEffect(() => {
    if (userCollection.length > 0) {
      setSelectedCollectionName(collectionNames[0]);
      setSelectedCollectionAddress(userCollection[0].contractAddress);
    }
  }, [userCollection.length]);

  useEffect(() => {
    (async () => {
      if (selectedCollectionAddress && account) {
        dispatch(setCollectionNfts([]));
        const nfts = await getUserCollectionNFTs(
          account,
          selectedCollectionAddress
        );

        dispatch(setCollectionNfts(nfts));
        dispatch(setSelectedNfts([]));
      }
    })();
  }, [selectedCollectionAddress, account]);

  const handleSelectCollection = (value: string, index: number) => {
    setSelectedCollectionName(value);
    setSelectedCollectionAddress(userCollection[index].contractAddress);
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
