import React from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { isMobile } from 'react-device-detect';
import DashBoardHomeMobile from './DashBoardHomeMobile';
import { Button } from '@/common';

import { setIsConnectionModalOpen } from '@/ducks';

import DashboardSubNav from '../SubNav';

import * as DutchC from './styles';
import { AppLayout } from '@/components/layout';

const DashBoardHome = () => {
  // const { isConnected } = useAppSelector((state) => state.webAppReducer);
  const isConnected = true;

  const dispatch = useAppDispatch();

  const openConnectionModal = () => {
    dispatch(setIsConnectionModalOpen(true));
  };

  if (isMobile) return <DashBoardHomeMobile />;
  return (
    <AppLayout>
      {isConnected ? (
        <DashboardSubNav />
      ) : (
        <DutchC.DashboardContentCover>
          <div className="text-6xl text-black dark:text-white">
            This is dummy content.{' '}
          </div>
          <Button className="mt-9 p-1" onClick={openConnectionModal}>
            Connect Wallet
          </Button>
        </DutchC.DashboardContentCover>
      )}
    </AppLayout>
  );
};

export default DashBoardHome;
