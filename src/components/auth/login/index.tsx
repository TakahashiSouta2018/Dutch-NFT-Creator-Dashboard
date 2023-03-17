import { useState } from 'react';
import { Modal, ModalHead, ModalBody } from '@/common';
import useWalletHook from '@/hooks/useWalletHook';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { Button } from '@/common';
import ConnectMetaMask from './ConnectMetaMask';
import ConnectionError from './ConnectionError';

import * as DutchC from './style';

const LoginHome = (): JSX.Element => {
  const [close, setClose] = useState(true);
  const [loading, setLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(true);
  const { connectAccount, disconnectAccount } = useWalletHook();

  console.log(loading);
  if (!connectionError)
    return (
      <Modal>
        <ModalHead title="Connect a Wallet" onClose={() => setClose(false)} />
        <ModalBody>
          {!loading ? (
            <DutchC.LoginWrapper>
              <DutchC.AccountWrapper>
                <DutchC.Account>
                  <button
                    onClick={() => connectAccount(ConnectorNames.MetaMask)}
                  >
                    <img
                      src="https://static.loopring.io/assets/svg/meta-mask.svg"
                      alt="MetaMask"
                      height="36"
                    />
                  </button>
                  <DutchC.TextNormal>MetaMask</DutchC.TextNormal>
                </DutchC.Account>
                <Button
                  onClick={() => {
                    setLoading(true);
                  }}
                >
                  Connect
                </Button>
              </DutchC.AccountWrapper>
              <DutchC.AccountWrapper>
                <DutchC.Account>
                  <button
                    onClick={() => connectAccount(ConnectorNames.Gamestop)}
                  >
                    <img
                      src="https://static.loopring.io/assets/svg/gs.svg"
                      alt="Gamestop"
                      height="36"
                    />
                  </button>
                  <DutchC.TextNormal>GameStop</DutchC.TextNormal>
                </DutchC.Account>
                <Button>Connect</Button>
              </DutchC.AccountWrapper>
              <DutchC.AccountWrapper>
                <DutchC.Account>
                  <button
                    onClick={() => connectAccount(ConnectorNames.WalletConnect)}
                  >
                    <img
                      src="https://static.loopring.io/assets/svg/wallet-connect.svg"
                      alt="walletConnect"
                      height="36"
                    />
                  </button>
                  <DutchC.TextNormal>WalletConnect</DutchC.TextNormal>
                </DutchC.Account>
                <Button>Connect</Button>
              </DutchC.AccountWrapper>
            </DutchC.LoginWrapper>
          ) : (
            <ConnectMetaMask />
          )}
        </ModalBody>
      </Modal>
    );
  else return <ConnectionError />;
};

export default LoginHome;
