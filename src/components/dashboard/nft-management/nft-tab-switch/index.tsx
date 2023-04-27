import { NFTI } from '@/types';
import React from 'react';

import NFTAll from '../nft-all';
import NFTCollections from '../nft-collections';
import NFTLists from '../nft-list';
import NFTArchives from '../nft-archives';

interface SwitchProps {
  currentTab: string;
  tableListSwtich: number;
  nftList: NFTI[];
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
        return <NFTAll tableListSwtich={tableListSwtich} />;
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
    }
  };
  return <div>{tabSwitch(currentTab)}</div>;
};

export default NFTTabSwitch;
