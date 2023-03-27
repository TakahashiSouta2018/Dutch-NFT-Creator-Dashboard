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
    name: ConnectorNames.MetaMask,
    imgUrl: 'https://static.loopring.io/assets/svg/meta-mask.svg',
  },
  {
    name: ConnectorNames.Gamestop,
    imgUrl: 'https://static.loopring.io/assets/svg/gs.svg',
  },
  {
    name: ConnectorNames.WalletConnect,
    imgUrl: 'https://static.loopring.io/assets/svg/wallet-connect.svg',
  },
];

interface LoginHomeProps {
  onClose?: () => void;
}

const LoginHome: React.FC<LoginHomeProps> = ({ onClose }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const { connectAccount } = useWalletHook();

  return (
    <Modal>
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
                        height="36"
                        width="36"
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
