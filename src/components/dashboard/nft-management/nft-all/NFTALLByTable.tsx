import React from 'react';
import * as DutchC from './styles';
import { NFTListType } from '@/types';
import NFTManagementTable from '@/components/shared/nft-management/NFTManagementTable';
interface NFTAllByTableProps {
  NFTs: NFTListType[];
  onNFTSelect: (nftId: string) => void;
}

const NFTAllByTable: React.FC<NFTAllByTableProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  return <NFTManagementTable nftList={NFTs} onClick={onNFTSelect} />;
};

export default NFTAllByTable;
