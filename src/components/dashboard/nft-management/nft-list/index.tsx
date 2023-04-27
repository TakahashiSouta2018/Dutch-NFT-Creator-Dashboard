import React, { useState, useEffect } from 'react';
import { NFTI, UserListI } from '@/types';
import NFTListByCard from './NFTListByCard';
import NFTListByTable from './NFTListByTable';
import useNFTManagement from '@/hooks/useNFTManagement';

interface NFTListProps {
  tableListSwtich: number;
  nftList: NFTI[];
  onShowListModal: () => void;
}

const NFTLists: React.FC<NFTListProps> = ({
  tableListSwtich,
  nftList,
  onShowListModal,
}): JSX.Element => {
  const { getUserNftList } = useNFTManagement();
  const [NFTs, setNFTs] = useState<UserListI[]>([]);

  useEffect(() => {
    (async () => {
      const lists = await getUserNftList('');
      if (lists) {
        const userList = lists.map((list) => {
          const imageUrls = list.nfts.map((nft) => nft.image);
          return { ...list, imageUrls };
        });

        setNFTs(userList);
      }
    })();
  }, []);

  if (tableListSwtich)
    return (
      <NFTListByTable multiNFTs={NFTs} onShowListModal={onShowListModal} />
    );
  else
    return <NFTListByCard multiNFTs={NFTs} onShowListModal={onShowListModal} />;
};

export default NFTLists;
