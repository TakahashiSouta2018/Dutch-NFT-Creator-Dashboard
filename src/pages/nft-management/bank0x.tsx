// components
import { AppLayout } from '@/components';
import Bank0xPage from '@/components/dashboard/nftManagement/Bank0xPage';
import Header from '@/components/dashboard/nftManagement/shared/Header';
import { wrapper } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { CreateNftManagementI, UsageStatusEnum } from '@/types';

import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';

const Archive = ({ nfts }: { nfts: CreateNftManagementI[] }) => {
  const [tableListSwtich, setTableListSwtich] = useState<number>(0);

  return (
    <AppLayout>
      <Header
        tableListSwtich={tableListSwtich}
        setTableListSwtich={setTableListSwtich}
      />
      <Bank0xPage listNfts={nfts} />
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

export default Archive;
