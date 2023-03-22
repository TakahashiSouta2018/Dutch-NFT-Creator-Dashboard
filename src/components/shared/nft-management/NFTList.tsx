import React, { useEffect } from 'react';
import { Table, TBody, THead, TR, TD, IconButton } from '@/common';
import * as DutchC from './styles';
import { nftListType } from '@/types';

import * as Icons from '@/common';

interface NFTListProps {
  selected: boolean;
  lists: nftListType[];
}

const NFTList: React.FC<NFTListProps> = ({ selected, lists }) => {
  let tmpLists = [];
  if (selected) {
    tmpLists = lists.filter((list) => list.selected);
  } else tmpLists = lists;
  return (
    <Table>
      <THead>
        <TR>
          <TD>
            <div className="mx-auto border rounded-full w-4 h-4 border-black/70" />
          </TD>
          <TD>Sr</TD>
          <TD>Name</TD>
          {selected && <TD>Collection</TD>}
          <TD>Mint Count</TD>
          <TD>Burned</TD>
          <TD>NFT id</TD>
        </TR>
      </THead>
      <TBody>
        {tmpLists.map((list) => {
          return (
            <TR key={list.sr}>
              <TD>
                {list.selected ? (
                  <Icons.ICheckCircle color="orange" size="large" />
                ) : (
                  <div className="mx-auto border rounded-full w-4 h-4 border-black/70" />
                )}
              </TD>
              <TD>{list.sr}</TD>
              <TD>{list.name}</TD>
              {selected && (
                <TD>
                  <DutchC.TextEllipsis>{list.collection}</DutchC.TextEllipsis>
                </TD>
              )}
              <TD>{list.mintCount}</TD>
              <TD>{list.burned ? 'Yes' : 'No'}</TD>
              <TD>
                <div className="flex items-center gap-1 px-2 py-0.5 border border-black/10 rounded-md">
                  <IconButton icon="wallet" />
                  <DutchC.TextEllipsis>{list.nftId}</DutchC.TextEllipsis>
                </div>
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTList;
