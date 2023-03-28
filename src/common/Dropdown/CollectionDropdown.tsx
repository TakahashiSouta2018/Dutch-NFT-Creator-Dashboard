import React, { useEffect, useState } from 'react';

import { Dropdown } from '@/common';
import useCollectionHook from '@/hooks/useCollectionHook';
import {
  setCollectionNfts,
  setSelectedNfts,
} from '@/components/dashboard/ducks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { LoopringService } from '@/lib/LoopringService';

// types
interface CollectionDropdownI {
  selectedCollectionAddress: string;
  setSelectedCollectionAddress: React.Dispatch<React.SetStateAction<string>>;
}

const CollectionDropdown: React.FC<CollectionDropdownI> = ({
  selectedCollectionAddress,
  setSelectedCollectionAddress,
}) => {
  const loopringService = new LoopringService();
  const dispatch = useAppDispatch();

  const { userCollection, collectionNames } = useCollectionHook();

  const [selectedCollectionName, setSelectedCollectionName] =
    useState<string>('');

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  useEffect(() => {
    if (userCollection.length > 0) {
      setSelectedCollectionName(collectionNames[0]);
      setSelectedCollectionAddress(userCollection[0].contractAddress);
    }
  }, [userCollection.length]);

  useEffect(() => {
    (async () => {
      if (selectedCollectionAddress) {
        if (!accountInfo) return;

        const nftsInfo = await loopringService.getUserNFTCollection({
          accountInfo,
          tokensAddress: [selectedCollectionAddress],
          offset: 0,
          limit: 50,
        });

        if (nftsInfo && nftsInfo.nfts && nftsInfo.nfts.length > 0)
          dispatch(setCollectionNfts(nftsInfo.nfts));
        else dispatch(setCollectionNfts([]));

        dispatch(setSelectedNfts([]));
      }
    })();
  }, [selectedCollectionAddress]);

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
