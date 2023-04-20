// components
import { AppLayout } from '@/components';
import { DashboardPageReducerI, setManagementNFTs } from '@/components/dashboard/ducks';
import AllPage from '@/components/dashboard/nftManagement/AllPage';
import SyncNFTs from '@/components/dashboard/nftManagement/AllPage/SyncNFTs';
import Header from '@/components/dashboard/nftManagement/shared/Header';
import { useAppDispatch, useAppSelector, wrapper } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { CreateNftManagementI, UsageStatusEnum } from '@/types';

import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';

const AllNfts = ({ nfts }: { nfts: CreateNftManagementI[] }) => {
  const dispatch = useAppDispatch();

  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);
  const [tableListSwtich, setTableListSwtich] = useState<number>(0);

  const { collectionNfts } = useAppSelector((state) => {
    const { collectionNfts } =
      state.dashboardPageReducer as DashboardPageReducerI;
    return { collectionNfts };
  }, shallowEqual);

  useEffect(()=>{
    dispatch(setManagementNFTs(nfts));
  }, [])


  return (
    <AppLayout>
      <Header
        tableListSwtich={tableListSwtich}
        setTableListSwtich={setTableListSwtich}
      />
      <AllPage tableListSwtich={tableListSwtich} />

      <SyncNFTs
        currentTab={'ALL'}
        showSyncModal={showSyncModal}
        setShowSyncModal={(flag) => setShowSyncModal(flag)}
        nftList={collectionNfts}
      />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (ctx: GetServerSidePropsContext) => {
      const nftManagement = new NFTManagementService();
      const user = getCookie('ACCOUNT', { req: ctx.req, res: ctx.res });

      const { response, data } = await nftManagement.getUserNfts(
        String(user),
        UsageStatusEnum.UNARCHIVED
      );

      let nfts: CreateNftManagementI[] = [];

      if (data && data.data) {
        nfts = data.data.nfts;
      }

      return {
        props: { nfts },
      };
    }
  );

export default AllNfts;
