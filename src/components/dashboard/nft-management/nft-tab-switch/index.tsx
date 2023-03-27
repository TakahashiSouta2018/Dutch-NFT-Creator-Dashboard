import { NFTListType } from '@/types';
import React from 'react';

import NFTAll from '../nft-all';
import NFTCollections from '../nft-collections';
import NFTLists from '../nft-list';
import NFTArchives from '../nft-archives';
import NFTBank0x from '../nft-bank0x';

interface SwitchProps {
  currentTab: string;
  tableListSwtich: number;
  nftList: NFTListType[];
  onShowListModal: () => void;
}

const NFTTabSwitch: React.FC<SwitchProps> = ({
  currentTab,
  tableListSwtich,
  nftList,
  onShowListModal,
}): JSX.Element => {
  const tabSwitch = (currentTab: string) => {
    switch (currentTab) {
      case 'ALL':
        return <NFTAll tableListSwtich={tableListSwtich} nftList={nftList} />;
      case 'LIST':
        return (
          <NFTLists
            tableListSwtich={tableListSwtich}
            nftList={nftList}
            onShowListModal={onShowListModal}
          />
        );
      case 'COLLECTION':
        return <NFTCollections />;
      case 'ARCHIVE':
        return <NFTArchives />;
      case 'BANK0X':
        return <NFTBank0x />;
    }
  };
  return <div>{tabSwitch(currentTab)}</div>;
};

export default NFTTabSwitch;
