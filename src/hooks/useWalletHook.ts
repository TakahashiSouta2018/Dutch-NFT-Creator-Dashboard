import {
  WebAppReducerI,
  setIsConnected,
  setIsConnectionLoading,
  setIsConnectionModalOpen,
  setWalletType,
} from '@/ducks';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import LoopringApi from '@/services/LoopringApi.service';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { connectProvides, walletServices } from '@loopring-web/web3-provider';
import assert from 'assert';
import { deleteCookie } from 'cookies-next';
import { shallowEqual } from 'react-redux';

const useWalletHook = () => {
  const loopringApi = new LoopringApi();
  const dispatch = useAppDispatch();

  const { account, apiKey } = useAppSelector((state) => {
    const { account, apiKey } = state.webAppReducer as WebAppReducerI;
    return { account, apiKey };
  }, shallowEqual);

  const disconnectAccount = () => {
    walletServices.sendDisconnect('', 'disconnect');
    dispatch(setIsConnected(false));
    deleteCookie('ACCOUNT');
    deleteCookie('APIKEY');
    deleteCookie('ACCOUNTID');
  };

  const getUserWalletInfo = async () => {
    try {
      assert(account, 'account === null');
      assert(apiKey, 'apiKey === null');

      const { response, data } = await loopringApi.getUserWalletInfo(
        account,
        apiKey
      );

      if (data && data.data) {
        return data.data.account;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
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

  return { connectAccount, disconnectAccount, getUserWalletInfo };
};

export default useWalletHook;
