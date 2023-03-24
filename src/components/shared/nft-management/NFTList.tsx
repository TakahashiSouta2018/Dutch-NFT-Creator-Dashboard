import React, { useEffect } from 'react';
import { Table, TBody, THead, TR, TD, IconButton } from '@/common';

import CopyNFTId from '@/components/dashboard/copy-nft-id';
import * as Icons from '@/common';

import * as DutchC from './styles';
import { NFTListType } from '@/types';

interface NFTListProps {
  selected: boolean;
  lists: NFTListType[];
  currentTab?: string;
}

const NFTList: React.FC<NFTListProps> = ({ selected, lists, currentTab }) => {
  let tmpLists = [];
  if (selected) {
    tmpLists = lists.filter((list) => list.selected);
  } else tmpLists = lists;
  return (
    <Table className="dark:text-white border rounded-xl">
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
        {tmpLists.map((list) => {
          return (
            <TR key={list.sr}>
              <TD>
                {list.selected ? (
                  <Icons.ICheckCircle
                    variant="solid"
                    color="orange"
                    size="large"
                  />
                ) : (
                  <DutchC.IconRound />
                )}
              </TD>
              {currentTab !== 'LIST' && <TD>{list.sr}</TD>}
              <TD>{list.name}</TD>
              {selected && (
                <TD>
                  <DutchC.TextEllipsis>{list.collection}</DutchC.TextEllipsis>
                </TD>
              )}
              <TD>{list.mintCount}</TD>
              {currentTab !== 'LIST' && <TD>{list.burned ? 'Yes' : 'No'}</TD>}
              <TD>
                <CopyNFTId
                  type="long"
                  id={'0xa613c0e37979f1a3bf9e96c9a42ef7b9e6392025'}
                />
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTList;
