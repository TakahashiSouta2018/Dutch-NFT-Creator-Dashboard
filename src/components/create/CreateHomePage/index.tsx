import React, { useState, useCallback, useEffect } from 'react';

// components
import { Button, SearchInput } from '@/common';


// icons
import useNFTHook from '@/hooks/useNFTHook';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';


import Header from './Header';
import DraftNFTCard from './DraftNFTCard';
import { CreatePageReducerI, setDraftNFTs, setMintModalIsOpen, setSelectedDraftNFTs } from '@/components/create/ducks';
import CollectionDropdown from '@/common/Dropdown/CollectionDropdown';
import Layout from '../shared/Layout';


const CreateHome: React.FC = () => {
  const { getCollectionDraftNFT } = useNFTHook();

  const [selectedCollectionAddress, setSelectedCollectionAddress] =
    useState<string>('');

  const { draftNFTs } = useAppSelector((state) => {
    const { draftNFTs } = state.createPageReducer as CreatePageReducerI;
    return { draftNFTs };
  }, shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (selectedCollectionAddress) {
        const nft = await getCollectionDraftNFT(selectedCollectionAddress);
        if (nft) {
          dispatch(setDraftNFTs(nft));
        }
      }
    })();
  }, [selectedCollectionAddress]);

  const onNFTSelect = useCallback(
    (id: number) => {
      const updatedNfts = draftNFTs.map((draftNFT) => {
        if (draftNFT.id === id) {
          return { ...draftNFT, selected: !draftNFT.selected };
        } else return draftNFT;
      });
      const selectedNfts = updatedNfts.filter(
        (updatedNft) => updatedNft.selected
      );
      dispatch(setSelectedDraftNFTs(selectedNfts));
      dispatch(setDraftNFTs(updatedNfts));
    },
    [draftNFTs]
  );

  const handleMintAll = () => {
    const updatedNfts = draftNFTs.map((draftNFT) => {
      return { ...draftNFT, selected: true };
    });

    dispatch(setSelectedDraftNFTs(updatedNfts));
    dispatch(setDraftNFTs(updatedNfts));
    dispatch(setMintModalIsOpen(true));
  };


  const isDraftNtSelected = draftNFTs && draftNFTs.length > 0 && draftNFTs?.filter((draftNFT) => draftNFT.selected).length > 0;

  return (
    <Layout>

      <div className='border-b border-black/10 dark:border-white/10'>

        <Header />

        <div className='flex w-1/4 my-4'>
          <CollectionDropdown
            selectedCollectionAddress={selectedCollectionAddress}
            setSelectedCollectionAddress={setSelectedCollectionAddress}
          />
        </div>
      </div>

      <div className='relative flex flex-col space-y-4 mt-5'>
        <div className='w-1/2 flex items-center space-x-4'>
          <SearchInput />
          {isDraftNtSelected && (
            <Button onClick={() => dispatch(setMintModalIsOpen(true))}>
              Mint Selected NFTs
            </Button>
          )}
          {draftNFTs.length > 0 && (
            <Button onClick={handleMintAll}>Mint all NFTs</Button>
          )}
        </div>
        <div className='grid grid-cols-5 gap-4'>
          {draftNFTs.map((nft) => (
            <DraftNFTCard
              key={nft.id}
              onSelect={() => onNFTSelect(nft.id)}
              {...nft}
            />
          ))}
        </div>
      </div>

    </Layout>
  );
};



export default CreateHome;
