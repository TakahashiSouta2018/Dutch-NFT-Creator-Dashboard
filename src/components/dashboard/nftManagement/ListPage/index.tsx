import React, { useState } from 'react';
import { UserListI } from '@/types';
import NFTListByCard from './NFTListByCard';
import NFTListByTable from './NFTListByTable';
import NFTModal from '../shared/NFTModal';
import { useAppSelector } from '@/redux/store';
import { shallowEqual } from 'react-redux';
import { DashboardPageReducerI } from '../../ducks';

interface NFTListProps {
  tableListSwtich: number;
  listNfts: UserListI[];
  showSyncModal: boolean;
  setShowSyncModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListPage: React.FC<NFTListProps> = ({
  tableListSwtich,
  listNfts,
  showSyncModal,
  setShowSyncModal,
}): JSX.Element => {
  const [NFTs, setNFTs] = useState<UserListI[]>(listNfts);

  const { collectionNfts } = useAppSelector((state) => {
    const { collectionNfts } =
      state.dashboardPageReducer as DashboardPageReducerI;
    return { collectionNfts };
  }, shallowEqual);

  let tabContent = <></>;

  if (tableListSwtich)
    tabContent = (
      <NFTListByTable
        multiNFTs={NFTs}
        onShowListModal={() => setShowSyncModal(false)}
      />
    );
  else
    tabContent = (
      <NFTListByCard
        multiNFTs={NFTs}
        onShowListModal={() => setShowSyncModal(false)}
      />
    );

  return (
    <>
      {tabContent}
      <NFTModal
        onClose={() => {
          setShowSyncModal(false);
        }}
        lists={collectionNfts}
        currentTab={'LIST'}
        showSyncModal={showSyncModal}
      />
    </>
  );
};

export default ListPage;
