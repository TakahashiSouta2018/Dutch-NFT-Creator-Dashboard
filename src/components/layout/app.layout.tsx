import useCollectionHook from '@/hooks/useCollectionHook';
import useConnectHook from '@/hooks/useConnectHook';
import React from 'react';

// components
import Header from './Header';
import * as DutchC from './styles';
import Footer from './Footer';

// types
interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  useConnectHook();
  useCollectionHook();

  return (
    <DutchC.AppWrapper>
      <Header />
      <DutchC.ContentWrapper>{children}</DutchC.ContentWrapper>
      <Footer />
    </DutchC.AppWrapper>
  );
};

export default AppLayout;
