import React, { useState } from 'react';
import * as DutchC from './styles';
import * as Icons from '@/common';
import { NFTModal } from '@/components/shared/nft-management/nft-modal';

export const SyncNFTs: React.FC = (): JSX.Element => {
  const [showSyncModal, setShowSyncModal] = useState(false);

  return (
    <DutchC.SyncNFTsWrapper
      onClick={(e) => {
        e.stopPropagation();
        setShowSyncModal(true);
      }}
    >
      <Icons.IArrowDownOnSquare color="white-gray" size="large" />
      <DutchC.FlexCol>
        <DutchC.TextXL>Sync NFTs</DutchC.TextXL>
        <div>
          You can sync your collections and NFTs to your DUTCH0x database.
        </div>
      </DutchC.FlexCol>
      {showSyncModal && (
        <NFTModal
          onClose={() => {
            setShowSyncModal(false);
          }}
          syncModal={showSyncModal}
        />
      )}
    </DutchC.SyncNFTsWrapper>
  );
};
