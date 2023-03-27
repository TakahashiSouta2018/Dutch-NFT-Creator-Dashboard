import React from 'react';
import * as Icons from '@/common';
import * as DutchC from './styles';
import { NFTModal } from './nft-modal';
import { NFTListType } from '@/types';

interface ShowSyncModalProps {
  showSyncModal: boolean;
  setShowSyncModal: (flag: boolean) => void;
  setSynced: (flag: boolean) => void;
  nftList: NFTListType[];
}

const SyncNFTs: React.FC<ShowSyncModalProps> = ({
  showSyncModal,
  setShowSyncModal,
  setSynced,
  nftList,
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
      {
        <NFTModal
          onClose={() => {
            setShowSyncModal(false);
          }}
          onSynced={() => {
            setSynced(true);
          }}
          lists={nftList}
          showSyncModal={showSyncModal}
        />
      }
    </DutchC.NFTSyncWrapper>
  );
};

export default SyncNFTs;
