import { Modal, ModalHead, ModalBody } from '@/common';
import Image from 'next/image';
import useWalletHook from '@/hooks/useWalletHook';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { Button } from '@/common';
import ConnectMetaMask from './ConnectMetaMask';
import ConnectionError from './ConnectionError';

import * as DutchC from './style';
import { shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsConnectionLoading, setIsConnectionModalOpen } from '@/ducks';
import { setConnectionError } from '@/ducks';

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

const ConnectWallet = (): JSX.Element => {
  const { connectAccount } = useWalletHook();
  const dispatch = useAppDispatch();

  const { connectionError, isConnectionLoading, isConnectionModalOpen } =
    useAppSelector((state) => {
      const { connectionError, isConnectionLoading, isConnectionModalOpen } =
        state.webAppReducer;
      return { connectionError, isConnectionLoading, isConnectionModalOpen };
    }, shallowEqual);

  const closeConnectionModal = () => {
    dispatch(setIsConnectionModalOpen(false));
    dispatch(setConnectionError(false));
    dispatch(setIsConnectionLoading(false));
  };

  let renderContent = <></>;

  if (connectionError) renderContent = <ConnectionError />;
  else if (isConnectionLoading) renderContent = <ConnectMetaMask />;
  else {
    renderContent = (
      <DutchC.LoginWrapper>
        {LoginOptions.map((option, i) => {
          return (
            <DutchC.AccountWrapper key={i}>
              <DutchC.Account>
                <button onClick={() => connectAccount(option.name)}>
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
                  dispatch(setIsConnectionLoading(true));
                  connectAccount(option.name);
                }}
              >
                Connect
              </Button>
            </DutchC.AccountWrapper>
          );
        })}
      </DutchC.LoginWrapper>
    );
  }

  return (
    <>
      <Modal isOpen={isConnectionModalOpen} className="max-w-xl">
        <ModalHead
          title={connectionError ? 'Connection Error' : 'Connect a Wallet'}
          onClose={closeConnectionModal}
        />
        <ModalBody>{renderContent}</ModalBody>
      </Modal>
    </>
  );
};

export default ConnectWallet;
