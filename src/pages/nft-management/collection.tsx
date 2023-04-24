// components
import { AppLayout } from '@/components';
import CollectionPage from '@/components/dashboard/nftManagement/CollectionPage';
import Header from '@/components/dashboard/nftManagement/shared/Header';
import { wrapper } from '@/redux/store';
import NFTManagementService from '@/services/NFTManagement.service';
import { UserListI } from '@/types';

import { getCookie } from 'cookies-next';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

const Collection = ({ nfts }: { nfts: UserListI[] }) => {
  const [listNfts, setListNfts] = useState<UserListI[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [tableListSwtich, setTableListSwtich] = useState<number>(0);

  useEffect(() => {
    setListNfts(nfts);
  }, [nfts.length]);

  useEffect(() => {
    const handleSearchText = () => {
      const filterNfts = nfts.filter((nft) =>
        nft.collectionName.toLowerCase().includes(searchText.toLowerCase())
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
      />

      <CollectionPage listNfts={listNfts} />
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(
    (store) => async (ctx: GetServerSidePropsContext) => {
      const nftManagement = new NFTManagementService();
      const user = getCookie('ACCOUNT', { req: ctx.req, res: ctx.res });

      const { response, data } = await nftManagement.getUserCollectionList(
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

export default Collection;
