// components
import { AppLayout } from '@/components';
import { setManagementNFTs } from '@/components/dashboard/ducks';
import ArchivePage from '@/components/dashboard/nftManagement/ArchivePage';
import Header from '@/components/dashboard/nftManagement/shared/Header';
import { useAppDispatch, wrapper } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { CreateNftManagementI, UsageStatusEnum } from '@/types';

import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

const Archive = ({ nfts }: { nfts: CreateNftManagementI[] }) => {
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState<string>('');
  const [tableListSwtich, setTableListSwtich] = useState<number>(0);

  useEffect(() => {
    dispatch(setManagementNFTs(nfts));
  }, [nfts.length]);

  useEffect(() => {
    const handleSearchText = () => {
      const filterNfts = nfts.filter((nft) => (nft.nftId.toLowerCase().includes(searchText.toLowerCase())) ||
        (nft.name.toLowerCase().includes(searchText.toLowerCase()))
      );
      dispatch(setManagementNFTs(filterNfts));
    };
    handleSearchText()
  }, [searchText])

  return (
    <AppLayout>
      <Header
        setSearchText={setSearchText}
        tableListSwtich={tableListSwtich}
        setTableListSwtich={setTableListSwtich}
      />
      <ArchivePage />
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
        UsageStatusEnum.ARCHIVED
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
