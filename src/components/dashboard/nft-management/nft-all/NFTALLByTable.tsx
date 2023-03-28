import React from 'react';
import * as DutchC from './styles';
import { CreateNftManagementI } from '@/types';
import NFTManagementTable from '@/components/dashboard/nft-management/nft-all/NFTManagementAllTable';

interface NFTAllByTableProps {
  NFTs: CreateNftManagementI[];
  onNFTSelect: (nftId: string) => void;
}

const NFTAllByTable: React.FC<NFTAllByTableProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  return <NFTManagementTable nftList={NFTs} onClick={onNFTSelect} />;
};

export default NFTAllByTable;
