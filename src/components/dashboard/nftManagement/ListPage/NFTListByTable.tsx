import React from 'react';
import { UserListI } from '@/types';
import NFTListTable from './NFTListTable';

interface NFTListByTableProps {
  multiNFTs: UserListI[];
  onShowListModal: () => void;
}

const NFTListByTable: React.FC<NFTListByTableProps> = ({
  onShowListModal,
  multiNFTs,
}): JSX.Element => {
  return (
    <NFTListTable nftMultiList={multiNFTs} onShowListModal={onShowListModal} />
  );
};

export default NFTListByTable;
