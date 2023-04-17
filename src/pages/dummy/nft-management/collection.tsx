// components
import { AppLayout } from '@/components';
import { DashboardPageReducerI } from '@/components/dashboard/ducks';
import CollectionPage from '@/components/dashboard/nftManagement/CollectionPage';
import Header from '@/components/dashboard/nftManagement/shared/Header';
import { useAppSelector, wrapper } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { UserListI } from '@/types';

import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { shallowEqual } from 'react-redux';

const Collection = ({ nfts }: { nfts: UserListI[] }) => {
  const [tableListSwtich, setTableListSwtich] = useState<number>(0);

  const { collectionNfts } = useAppSelector((state) => {
    const { collectionNfts } = state.dashboardPageReducer as DashboardPageReducerI;
    return { collectionNfts };
  }, shallowEqual);

  console.log({ collectionNfts });


  return (
    <AppLayout>
      <Header
        tableListSwtich={tableListSwtich}
        setTableListSwtich={setTableListSwtich}
      />

      <CollectionPage listNfts={nfts} />

    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (ctx: GetServerSidePropsContext) => {
      const nftManagement = new NFTManagementService();
      const user = getCookie('ACCOUNT', { req: ctx.req, res: ctx.res });

      const { response, data } = await nftManagement.getUserCollectionList(String(user));

      let nfts: UserListI[] = [];

      if (data && data.data) {
        nfts = data.data.nfts;
      }

      return {
        props: { nfts },
      };
    }
  );

export default Collection;
