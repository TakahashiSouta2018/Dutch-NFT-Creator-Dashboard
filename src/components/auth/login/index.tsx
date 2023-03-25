import { useState } from 'react';
import Image from 'next/image';
import { Modal, ModalHead, ModalBody } from '@/common';
import useWalletHook from '@/hooks/useWalletHook';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { Button } from '@/common';
import ConnectMetaMask from './ConnectMetaMask';
import ConnectionError from './ConnectionError';

import * as DutchC from './styles';

const LoginOptions = [
  {
    name: 'MetaMask',
    imgUrl: 'https://static.loopring.io/assets/svg/meta-mask.svg',
  },
  {
    name: 'GameStop',
    imgUrl: 'https://static.loopring.io/assets/svg/gs.svg',
  },
  {
    name: 'WalletConnect',
    imgUrl: 'https://static.loopring.io/assets/svg/wallet-connect.svg',
  },
];

interface LoginHomeProps {
  onClose?: () => void;
  connectWallet: boolean;
}

const LoginHome: React.FC<LoginHomeProps> = ({
  onClose,
  connectWallet,
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const { connectAccount } = useWalletHook();

  return (
    <Modal isOpen={connectWallet} className="max-w-xl">
      <ModalHead
        title={connectionError ? 'Connection Error' : 'Connect a Wallet'}
        onClose={onClose}
      />
      <ModalBody>
        {connectionError ? (
          <ConnectionError />
        ) : loading ? (
          <ConnectMetaMask />
        ) : (
          <DutchC.LoginWrapper>
            {LoginOptions.map((option, i) => {
              return (
                <DutchC.AccountWrapper key={i}>
                  <DutchC.Account>
                    <button
                      onClick={() => connectAccount(ConnectorNames.MetaMask)}
                    >
                      <Image
                        src={option.imgUrl}
                        alt="MetaMask"
                        width="36"
                        height="36"
                      />
                    </button>
                    <DutchC.TextNormal>{option.name}</DutchC.TextNormal>
                  </DutchC.Account>
                  <Button
                    onClick={() => {
                      setLoading(true);
                    }}
                  >
                    Connect
                  </Button>
                </DutchC.AccountWrapper>
              );
            })}
          </DutchC.LoginWrapper>
        )}
      </ModalBody>
    </Modal>
  );
};

export default LoginHome;
