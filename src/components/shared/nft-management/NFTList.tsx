import React, { useEffect } from 'react';
import { Table, TBody, THead, TR, TD, IconButton } from '@/common';
import * as DutchC from './styles';
import { NFTListType } from '@/types';

import * as Icons from '@/common';

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
    <Table>
      <THead>
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
                  <Icons.ICheckCircle color="orange" size="large" />
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
                <DutchC.NFTIdWrapper>
                  <IconButton icon="document" />
                  <DutchC.TextEllipsis>{list.nftId}</DutchC.TextEllipsis>
                </DutchC.NFTIdWrapper>
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
};

export default NFTList;
