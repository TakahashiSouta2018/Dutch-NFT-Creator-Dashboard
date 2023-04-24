import React from 'react';
import * as Icons from '@/common';
import { NFTI, TabTypeT } from '@/types';
import NFTModal from '../../shared/NFTModal';

interface ShowSyncModalProps {
  showSyncModal: boolean;
  setShowSyncModal: (flag: boolean) => void;
  nftList: NFTI[];
  currentTab: TabTypeT;
}

const SyncNFTs: React.FC<ShowSyncModalProps> = ({
  showSyncModal,
  setShowSyncModal,
  nftList,
  currentTab,
}) => {
  return (
    <div
      className="flex gap-5 rounded-lg bg-black p-6 w-full text-white cursor-pointer dark:bg-white dark:text-black mt-10"
      onClick={(e) => {
        e.stopPropagation();
        setShowSyncModal(true);
      }}
    >
      <Icons.IArrowDownOnSquare color="white-gray" size="large" />
      <div className="flex flex-col">
        <div className="font-bold text-xl">Sync NFTs</div>
        <p>You can sync your collections and NFTs to your DUTCH0x database.</p>
      </div>
      {
        <NFTModal
          onClose={() => {
            setShowSyncModal(false);
          }}
          lists={nftList}
          currentTab={currentTab}
          showSyncModal={showSyncModal}
        />
      }
    </div>
  );
};

export default SyncNFTs;
