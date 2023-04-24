import React from 'react';
import { Table, TBody, THead, TR, TD } from '@/common';
import { toast } from 'react-toastify';

import * as Icons from '@/common';

import * as DutchC from './styles';
import { NFTI, TabTypeT } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import {
  DashboardPageReducerI,
  setSelectedNfts,
} from '@/components/dashboard/ducks';
import useNFTManagement from '@/hooks/useNFTManagement';
import useCollectionHook from '@/hooks/useCollectionHook';
import CopyNFTId from '@/components/dashboard/nftManagement/shared/CopyNFTId';
import { WebAppReducerI } from '@/ducks';
import assert from 'assert';

interface NFTListProps {
  lists: NFTI[];
  currentTab: TabTypeT;
  isSelectedTable?: boolean;
}

const NFTList: React.FC<NFTListProps> = ({
  lists,
  currentTab,
  isSelectedTable,
}) => {
  const dispatch = useAppDispatch();
  const { getUserNftId } = useNFTManagement();
  const { getCollectionNameByAddress } = useCollectionHook();

  const { selectedNFTs } = useAppSelector((state) => {
    const { selectedNFTs } =
      state.dashboardPageReducer as DashboardPageReducerI;
    return { selectedNFTs };
  }, shallowEqual);

  const { account } = useAppSelector((state) => {
    const { account } = state.webAppReducer as WebAppReducerI;
    return { account };
  }, shallowEqual);

  const isSelected = (nftId: string) => {
    return (
      selectedNFTs.filter((selectedNFT) => selectedNFT.nftID === nftId).length >
      0
    );
  };

  const handleSelectNft = async (list: NFTI) => {
    assert(account, 'account === null');

    const nft = await getUserNftId(account, list.nftID);
    if (nft && currentTab === 'ALL') {
      return toast('NFT already added to management', { type: 'info' });
    }

    dispatch(setSelectedNfts(list));
  };

  const selected = true;
  return (
    <Table className="dark:text-white text-black border rounded-xl">
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
            <TR key={index} onClick={() => handleSelectNft(list)}>
              <TD>
                {isSelected(list.nftID) ? (
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
                  {getCollectionNameByAddress(list.tokenAddress)}
                </DutchC.TextEllipsis>
              </TD>
              <TD>{list.amount}</TD>
              {currentTab !== 'LIST' && <TD>{false ? 'Yes' : 'No'}</TD>}
              <TD>
                <CopyNFTId type="long" id={list.nftID} />
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTList;
