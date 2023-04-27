import React from 'react';
import * as Icons from '@/common';
import * as DutchC from './styles';
import { NFTModal } from './nft-modal';
import { NFTI, TabTypeT, NFTI_Deprecated } from '@/types';

interface ShowSyncModalProps {
  showSyncModal: boolean;
  setShowSyncModal: (flag: boolean) => void;
  nftList: NFTI_Deprecated[];
  currentTab: TabTypeT;
  setIsSynced: () => void;
}

const SyncNFTs: React.FC<ShowSyncModalProps> = ({
  showSyncModal,
  setShowSyncModal,
  nftList,
  currentTab,
  setIsSynced,
}) => {
  return (
    <DutchC.NFTSyncWrapper
      onClick={(e) => {
        e.stopPropagation();
        setShowSyncModal(true);
      }}
    >
      <Icons.IArrowDownOnSquare color="white-gray" size="large" />
      <DutchC.FlexCol>
        <DutchC.TextXL>Sync NFTs</DutchC.TextXL>
        <p>You can sync your collections and NFTs to your DUTCH0x database.</p>
      </DutchC.FlexCol>

      <NFTModal
        onClose={() => {
          setShowSyncModal(false);
        }}
        lists={nftList}
        currentTab={currentTab}
        showSyncModal={showSyncModal}
        setIsSynced={setIsSynced}
      />
    </DutchC.NFTSyncWrapper>
  );
};

export default SyncNFTs;
