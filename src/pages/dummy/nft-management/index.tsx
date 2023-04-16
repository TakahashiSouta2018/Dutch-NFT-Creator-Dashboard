// components
import { AppLayout } from '@/components';
import AllPage from '@/components/dashboardPage/nftManagement/AllPage';
import Header from '@/components/dashboardPage/nftManagement/shared/Header';
import SyncNFTs from '@/components/shared/nft-management/SyncNFTs';
import { wrapper } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { CreateNftManagementI, UsageStatusEnum, TabTypeT, NFTI } from '@/types';

import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';


const NFTManagement = ({ nfts }: { nfts: CreateNftManagementI[] }) => {
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false)

  return (
    <AppLayout>
      <Header />
      <AllPage tableListSwtich={0} listNfts={nfts} />
      {nfts.length === 0 && (
        <SyncNFTs
          currentTab={"ALL"}
          showSyncModal={showSyncModal}
          setShowSyncModal={(flag) => setShowSyncModal(flag)}
          nftList={[]}
        />
      )}
    </AppLayout>
  );
}

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

export default NFTManagement;
