import React from 'react';
import * as DutchC from './styles';
import * as Icons from '@/common';

interface SyncNFTsProps {
  onSyncNFTTable: () => void;
}

export const SyncNFTs: React.FC<SyncNFTsProps> = ({
  onSyncNFTTable,
}): JSX.Element => {
  return (
    <DutchC.SyncNFTsWrapper onClick={onSyncNFTTable}>
      <Icons.IArrowDownOnSquare color="white-gray" size="large" />
      <DutchC.FlexCol>
        <DutchC.TextXL>Sync NFTs</DutchC.TextXL>
        <div>
          You can sync your collections and NFTs to your DUTCH0x database.
        </div>
      </DutchC.FlexCol>
    </DutchC.SyncNFTsWrapper>
  );
};
