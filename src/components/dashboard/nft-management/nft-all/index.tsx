import React, { useState, useCallback, useEffect } from 'react';
import { CreateNftManagementI, UsageStatusEnum } from '@/types';
import NFTAllByCard from './NFTAllByCard';
import NFTAllByTable from './NFTALLByTable';
import useNFTManagement from '@/hooks/useNFTManagement';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';

interface NFTAllProps {
  tableListSwtich: number;
}

const mockList = [
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    availableCount: 29,
    mintCount: 1000,
    burned: false,
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    selected: true,
    img: '/images/rice.webp',
  },
];

const NFTAll: React.FC<NFTAllProps> = ({ tableListSwtich }): JSX.Element => {
  const { getUserNfts } = useNFTManagement();
  const [NFTs, setNFTs] = useState<CreateNftManagementI[]>([]);
  const [loading, setLoading] = useState(false);

  const { accountInfo } = useAppSelector((state) => {
    const { accountInfo } = state.webAppReducer;
    return { accountInfo };
  }, shallowEqual);

  useEffect(() => {
    (async () => {
      if (accountInfo) {
        setLoading(true);
        const nfts = await getUserNfts(
          accountInfo.accInfo.owner,
          UsageStatusEnum.UNARCHIVED
        );

        if (nfts) {
          setNFTs(nfts);
          setLoading(false);
        }
      }
    })();
  }, [accountInfo?.accInfo.owner]);

  const onNFTSelect = useCallback(
    (nftId: string) => {
      const index = NFTs.findIndex((nft) => nft.nftId === nftId);
      const nft = NFTs.find((nft) => nft.nftId === nftId);
      if (nft) {
        setNFTs([
          ...NFTs.slice(0, index),
          {
            ...nft,
          },
          ...NFTs.slice(index + 1),
        ]);
      }
    },
    [NFTs]
  );

  if (tableListSwtich)
    return <NFTAllByTable NFTs={NFTs} onNFTSelect={onNFTSelect} />;
  else return <NFTAllByCard NFTs={NFTs} onNFTSelect={onNFTSelect} />;
};

export default NFTAll;
