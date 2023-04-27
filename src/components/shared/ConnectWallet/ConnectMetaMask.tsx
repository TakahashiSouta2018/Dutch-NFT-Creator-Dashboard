import React, { useState } from 'react';
import * as DutchC from './style';
import { DynamicLoader } from '@/common/Loader';

const ConnectMetaMask: React.FC = () => {
  return (
    <DutchC.ConnectMetaMaskWrapper>
      <DynamicLoader />
      <DutchC.TextNormal>Connect Wallet with MetaMask...</DutchC.TextNormal>
    </DutchC.ConnectMetaMaskWrapper>
  );
};

export default ConnectMetaMask;
