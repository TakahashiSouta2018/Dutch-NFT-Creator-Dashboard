import React from 'react';
import * as DutchC from './styles';
import { NFTListType } from '@/types';
import NFTManagementTable from '@/components/shared/nft-management/NFTManagementTable';
interface NFTListByTableProps {
  NFTs: NFTListType[];
  onNFTSelect: (nftId: string) => void;
}

const NFTListByTable: React.FC<NFTListByTableProps> = ({
  NFTs,
  onNFTSelect,
}): JSX.Element => {
  return <NFTManagementTable nftList={NFTs} onClick={onNFTSelect} />;
};

export default NFTListByTable;
