import React, { useEffect } from 'react';
import { Table, TBody, THead, TR, TD, IconButton } from '@/common';
import * as DutchC from './styles';

import * as Icons from '@/common';

interface NFTListProps {
  selected: boolean;
}

const lists = [
  {
    sr: '001',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    mintCount: 100,
    burned: 'No',
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    active: true,
  },
  {
    sr: '002',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    mintCount: 100,
    burned: 'No',
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    active: true,
  },
  {
    sr: '003',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    mintCount: 100,
    burned: 'No',
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    active: true,
  },
  {
    sr: '004',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    mintCount: 100,
    burned: 'No',
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    active: false,
  },
  {
    sr: '005',
    name: 'Red Onion',
    collection: '🍎🍌🍍The Fruit Salad Game🍆🥦🥕',
    mintCount: 100,
    burned: 'No',
    nftId: '0x314c44cae272f9afb555de3b485c7686c3823ac2b13fa0b16eafcbaf9e76c0b8',
    active: false,
  },
];

const NFTList: React.FC<NFTListProps> = ({ selected }) => {
  let tmpLists = [];
  if (selected) {
    tmpLists = lists.filter((list) => list.active);
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
                {list.active ? (
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
              <TD>{list.burned}</TD>
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
