import React from 'react';
import { Table, TBody, THead, TR, TD } from '@/common';
import { toast } from 'react-toastify';

import CopyNFTId from '@/components/dashboard/copy-nft-id';
import * as Icons from '@/common';

import * as DutchC from './styles';
import { NFTI, TabTypeT, NFTI_Deprecated } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { setSelectedNfts } from '@/components/dashboard/ducks';
import useNFTManagement from '@/hooks/useNFTManagement';

interface NFTListProps {
  lists: NFTI_Deprecated[];
  currentTab: TabTypeT;
  isSelectedTable?: boolean;
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
];

const NFTList: React.FC<NFTListProps> = ({
  lists,
  currentTab,
  isSelectedTable,
}) => {
  const dispatch = useAppDispatch();
  const { getUserNftId } = useNFTManagement();

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } = state.dashboardPageReducer;
    return { selectedNFTs };
  }, shallowEqual);

  const isSelected = (nftId: string) => {
    return (
      selectedNFTs.filter(
        (selectedNFT: NFTI_Deprecated) => selectedNFT.nftId === nftId
      ).length > 0
    );
  };

  const handleSelectNft = async (list: NFTI_Deprecated) => {
    const nft = await getUserNftId(list.tokenAddress, list.nftId);
    if (nft && currentTab === 'ALL') {
      return toast('NFT already added to management', { type: 'info' });
    }

    dispatch(setSelectedNfts(list));
  };

  return (
    <Table className="dark:text-white text-black border rounded-md">
      <THead className="bg-black/5 dark:bg-white/5">
        <TR>
          <TD>
            <DutchC.IconRound />
          </TD>
          {currentTab !== 'LIST' && <TD>Sr</TD>}
          <TD>Name</TD>
          {isSelectedTable && <TD>Collection</TD>}
          <TD>Mint Count</TD>
          {currentTab !== 'LIST' && <TD>Burned</TD>}
          <TD>NFT id</TD>
        </TR>
      </THead>
      <TBody>
        {lists.map((list, index) => {
          return (
            <TR
              key={index}
              onClick={() => handleSelectNft(list)}
              className={` hover:shadow-sm hover:shadow-gray-500 ${
                isSelected(list.nftId) ? '!border-4' : ''
              }`}
            >
              <TD>
                {isSelected(list.nftId) ? (
                  <Icons.ICheckCircle
                    variant="solid"
                    color="orange"
                    size="large"
                  />
                ) : (
                  <DutchC.IconRound />
                )}
              </TD>
              {currentTab !== 'LIST' && <TD>{index}</TD>}
              <TD>{list?.metadata?.name}</TD>
              {isSelectedTable && (
                <TD>
                  <DutchC.TextEllipsis>
                    {list?.collectionInfo?.name}
                  </DutchC.TextEllipsis>
                </TD>
              )}
              <TD>{list.total}</TD>
              {currentTab !== 'LIST' && <TD>{list.locked ? 'Yes' : 'No'}</TD>}
              <TD>
                <CopyNFTId type="long" id={list.nftId} />
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTList;
