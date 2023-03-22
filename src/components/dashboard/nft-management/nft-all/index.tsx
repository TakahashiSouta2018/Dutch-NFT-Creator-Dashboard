import React, { useState, useCallback } from 'react';
import * as DutchC from './styles';
import * as Icons from '@/common';
import { NFTModal } from '@/components/shared/nft-management/nft-modal';
import NFTCard from '../../cards/nft-card';
import { nftListType } from '@/types';

const NFTAll: React.FC = (): JSX.Element => {
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isSynced, setSynced] = useState(false);

  const nftList = [
    {
      sr: '001',
      name: 'Red Onion',
      collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
      mintCount: 29,
      burned: false,
      nftId:
        '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
      selected: true,
      img: '/images/rice.webp',
    },
    {
      sr: '002',
      name: 'Red Onion',
      collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
      mintCount: 29,
      burned: false,
      nftId:
        '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b9',
      selected: true,
      img: '/images/rice.webp',
    },
    {
      sr: '003',
      name: 'Red Onion',
      collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
      mintCount: 29,
      burned: false,
      nftId:
        '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c010',
      selected: true,
      img: '/images/rice.webp',
    },
    {
      sr: '004',
      name: 'Red Onion',
      collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
      mintCount: 29,
      burned: false,
      nftId:
        '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c011',
      selected: false,
      img: '/images/rice.webp',
    },
    {
      sr: '005',
      name: 'Red Onion',
      collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
      mintCount: 29,
      burned: false,
      nftId:
        '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c012',
      selected: false,
      img: '/images/rice.webp',
    },
  ];

  const [NFTs, setNFTs] = useState<nftListType[]>(nftList);
  const onNFTSelect = useCallback(
    (nftId: string) => {
      const index = NFTs.findIndex((nft) => nft.nftId === nftId);
      const nft = NFTs.find((nft) => nft.nftId === nftId);
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

  if (isSynced)
    return (
      <DutchC.NFTCardWrapper>
        {NFTs.map((nft) => (
          <NFTCard
            key={nft.nftId}
            onSelect={() => onNFTSelect(nft.nftId)}
            type="bank0x"
            {...nft}
          />
        ))}
      </DutchC.NFTCardWrapper>
    );
  return (
    <DutchC.NFTAllWrapper
      onClick={(e) => {
        e.stopPropagation();
        setShowSyncModal(true);
      }}
    >
      <Icons.IArrowDownOnSquare color="white-gray" size="large" />
      <DutchC.FlexCol>
        <DutchC.TextXL>Sync NFTs</DutchC.TextXL>
        <p>You can sync your collections and NFTs to your DUTCH0x database.</p>
      </DutchC.FlexCol>
      {showSyncModal && (
        <NFTModal
          onClose={() => {
            setShowSyncModal(false);
          }}
          syncModal={showSyncModal}
          onSynced={() => {
            setSynced(true);
          }}
          lists={nftList}
        />
      )}
    </DutchC.NFTAllWrapper>
  );
};

export default NFTAll;
