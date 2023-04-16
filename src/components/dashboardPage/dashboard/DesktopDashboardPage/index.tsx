import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Button } from '@/common';

import { setIsConnectionModalOpen } from '@/ducks';


import { AppLayout } from '@/components/layout';
import Navbar from './Navbar';

const DesktopDashboardPage = () => {
  const { isConnected } = useAppSelector((state) => state.webAppReducer);

  const dispatch = useAppDispatch();

  const openConnectionModal = () => {
    dispatch(setIsConnectionModalOpen(true));
  };

  return (
    <AppLayout>
      {isConnected ? (
        <Navbar />
      ) : (
        <div className='fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-center'>
          <div className="text-6xl text-black dark:text-white">
            This is dummy content.{' '}
          </div>
          <Button className="mt-9 p-1" onClick={openConnectionModal}>
            Connect Wallet
          </Button>
        </div>
      )}
    </AppLayout>
  );
};

export default DesktopDashboardPage;
