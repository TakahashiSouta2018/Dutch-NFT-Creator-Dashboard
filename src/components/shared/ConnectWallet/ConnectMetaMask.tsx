import React from 'react';
import * as DutchC from './style';
import LoadingIcon from '@/assets/loading.png';
import Image from 'next/image';

const ConnectMetaMask: React.FC = () => {
  return (
    <DutchC.ConnectMetaMaskWrapper>
      <Image src={LoadingIcon} alt="connect..." />
      <DutchC.TextNormal>Connect Wallet with MetaMask...</DutchC.TextNormal>
    </DutchC.ConnectMetaMaskWrapper>
  );
};

export default ConnectMetaMask;
