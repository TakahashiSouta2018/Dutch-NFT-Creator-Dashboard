// components
import { AppLayout } from '@/components';
import ListPage from '@/components/dashboard/nftManagement/ListPage';
import Header from '@/components/dashboard/nftManagement/shared/Header';
import { wrapper } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { UserListI } from '@/types';

import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

const List = ({ nfts }: { nfts: UserListI[] }) => {
  const [listNfts, setListNfts] = useState<UserListI[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);
  const [tableListSwtich, setTableListSwtich] = useState<number>(0);

  useEffect(() => {
    setListNfts(nfts);
  }, [nfts.length]);

  useEffect(() => {
    const handleSearchText = () => {
      const filterNfts = nfts.filter((nft) =>
        nft.listName.toLowerCase().includes(searchText.toLowerCase())
      );
      setListNfts(filterNfts);
    };
    handleSearchText();
  }, [searchText]);

  return (
    <AppLayout>
      <Header
        setSearchText={setSearchText}
        tableListSwtich={tableListSwtich}
        setTableListSwtich={setTableListSwtich}
        setShowCreatListModal={setShowSyncModal}
      />

      <ListPage
        tableListSwtich={tableListSwtich}
        listNfts={listNfts}
        setShowSyncModal={setShowSyncModal}
        showSyncModal={showSyncModal}
      />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (ctx: GetServerSidePropsContext) => {
      const nftManagement = new NFTManagementService();
      const user = getCookie('ACCOUNT', { req: ctx.req, res: ctx.res });

      const { response, data } = await nftManagement.getUserNftList(
        String(user)
      );

      let nfts: UserListI[] = [];

      if (data && data.data) {
        nfts = data.data.nfts;
      }

      return {
        props: { nfts },
      };
    }
  );

export default List;
