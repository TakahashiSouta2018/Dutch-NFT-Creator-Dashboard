import { setIsConnected, setWalletType } from '@/ducks';
import { useAppDispatch } from '@/redux/store';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { connectProvides, walletServices } from '@loopring-web/web3-provider';

const useWalletHook = () => {
  const dispatch = useAppDispatch();

  const disconnectAccount = () => {
    walletServices.sendDisconnect('', 'disconnect');
    dispatch(setIsConnected(false));
  };

  const connectAccount = async (connectorName: ConnectorNames) => {
    disconnectAccount();

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

    dispatch(setWalletType(connectorName));
  };

  return { connectAccount, disconnectAccount };
};

export default useWalletHook;
