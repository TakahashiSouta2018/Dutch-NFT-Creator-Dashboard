import React from 'react';
import { Table, TBody, THead, TR, TD } from '@/common';
import { toast } from 'react-toastify';

import CopyNFTId from '@/components/dashboard/copy-nft-id';
import * as Icons from '@/common';

import * as DutchC from './styles';
import { NFTI, TabTypeT } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { setSelectedNfts } from '@/components/dashboard/ducks';
import useNFTManagement from '@/hooks/useNFTManagement';

interface NFTListProps {
  lists: NFTI[];
  currentTab: TabTypeT;
}

const NFTList: React.FC<NFTListProps> = ({ lists, currentTab }) => {
  const dispatch = useAppDispatch();
  const { getUserNftId } = useNFTManagement();

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } = state.dashboardPageReducer;
    return { selectedNFTs };
  }, shallowEqual);

  const isSelected = (nftId: string) => {
    return (
      selectedNFTs.filter((selectedNFT) => selectedNFT.nftId === nftId).length >
      0
    );
  };

  const handleSelectNft = async (list: NFTI) => {
    const nft = await getUserNftId(list.nftId);
    if (nft && currentTab === 'ALL') {
      return toast('NFT already added to management', { type: 'info' });
    }

    dispatch(setSelectedNfts(list));
  };

  const selected = true;
  return (
    <Table className="dark:text-white text-black border rounded-xl">
      <THead className="border-orange bg-black/5 dark:bg-white/5">
        <TR>
          <TD>
            <DutchC.IconRound />
          </TD>
          {currentTab !== 'LIST' && <TD>Sr</TD>}
          <TD>Name</TD>
          {selected && <TD>Collection</TD>}
          <TD>Mint Count</TD>
          {currentTab !== 'LIST' && <TD>Burned</TD>}
          <TD>NFT id</TD>
        </TR>
      </THead>
      <TBody>
        {lists.map((list, index) => {
          return (
            <TR key={index} onClick={() => handleSelectNft(list)}>
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
              <TD>
                <DutchC.TextEllipsis>
                  {list?.collectionInfo?.name}
                </DutchC.TextEllipsis>
              </TD>
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
