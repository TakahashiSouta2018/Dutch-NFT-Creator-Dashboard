import {
  setIsConnected,
  setIsConnectionLoading,
  setIsConnectionModalOpen,
  setWalletType,
} from '@/ducks';
import { useAppDispatch } from '@/redux/store';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { connectProvides, walletServices } from '@loopring-web/web3-provider';
import { deleteCookie } from 'cookies-next';

const useWalletHook = () => {
  const dispatch = useAppDispatch();

  const disconnectAccount = () => {
    walletServices.sendDisconnect('', 'disconnect');
    dispatch(setIsConnected(false));
    deleteCookie('ACCOUNT');
    deleteCookie('APIKEY');
    deleteCookie('ACCOUNTID');
  };

  const connectAccount = async (
    connectorName: ConnectorNames,
    signOnly?: boolean
  ) => {
    if (!signOnly) {
      disconnectAccount();
      dispatch(setIsConnectionLoading(true));
    }

    switch (connectorName) {
      case ConnectorNames.Coinbase:
        await connectProvides.Coinbase({});
        break;
      case ConnectorNames.Gamestop:
        await connectProvides.GameStop({ darkMode: true });
        break;
      case ConnectorNames.WalletConnect:
        await connectProvides.WalletConnect({
          account: undefined,
          darkMode: true,
        });
        break;
      default:
        await connectProvides.MetaMask({});
        break;
    }
    if (!signOnly) {
      dispatch(setIsConnectionLoading(false));
      dispatch(setIsConnectionModalOpen(false));
      dispatch(setWalletType(connectorName));
    }
  };

  return { connectAccount, disconnectAccount };
};

export default useWalletHook;
