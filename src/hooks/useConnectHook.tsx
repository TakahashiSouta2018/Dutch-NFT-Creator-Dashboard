import { setAccountInfo, setIsConnected } from '@/ducks';
import { LoopringService } from '@/lib/LoopringService';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ChainId } from '@loopring-web/loopring-sdk';
import { useEffect, useState, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import useConnectHelper, {
  handleConnectI,
  handleErrorI,
  handleProcessingI,
} from '../helpers/useConnectHelper';

const useConnectHook = () => {
  const [connectionInfo, setConnectionInfo] = useState<{
    account: string;
    chainId: ChainId | 'unknown';
  }>({ account: '', chainId: 'unknown' });
  const loopringService = useMemo(() => new LoopringService(), []);
  const dispatch = useAppDispatch();

  const { walletType, accountInfo } = useAppSelector((state) => {
    const { walletType, accountInfo } = state.webAppReducer;
    return { walletType, accountInfo };
  }, shallowEqual);

  useEffect(() => {
    (async () => {
      try {
        const { account, chainId } = connectionInfo;

        if (chainId === 'unknown' || account === '') return;
        if (chainId !== Number(process.env.NEXT_PUBLIC_CHAIN_ID))
          return alert('Wrong Network');
        if (accountInfo?.accInfo?.owner === account) return;

        const { accInfo } = await loopringService.exchangeAPI.getAccount({
          owner: account,
        });

        if (!accInfo) return alert('Account Not Activated');

        const accountDetails = await loopringService.unlockAccount(
          account,
          walletType
        );
        const userExist = accountDetails ? true : false;

        dispatch(setAccountInfo(accountDetails));
        dispatch(setIsConnected(userExist));
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, [connectionInfo, dispatch, accountInfo, loopringService, walletType]);

  useEffect(() => {
    (async () => {
      try {
        const { account, chainId } = connectionInfo;

        if (chainId === 'unknown' || account === '') return;

        if (
          accountInfo?.accInfo?.owner !== account &&
          chainId == Number(process.env.NEXT_PUBLIC_CHAIN_ID)
        ) {
          dispatch(setAccountInfo(null));
          dispatch(setIsConnected(false));
        }
      } catch (error: any) {}
    })();
  }, [accountInfo?.accInfo?.owner, connectionInfo, dispatch]);

  useConnectHelper({
    handleAccountDisconnect: () => {
      console.log('handleAccountDisconnect:');
    },
    handleProcessing: ({ opts }: handleProcessingI) => {
      console.log(opts);
    },
    handleError: (props: handleErrorI) => {
      console.log('---> handleError:', props);
      console.log('---> handleErrorMSG:', props);
      //@ts-ignore
      alert(props.opts.error.message);
    },
    handleConnect: async ({ accounts, chainId }: handleConnectI) => {
      setConnectionInfo({ account: accounts[0], chainId });

      console.log(
        'After connect >>,network part start: step1 networkUpdate',
        accounts[0]
      );
      console.log('After connect >>,network part done: step2 check account');
    },
  });
};

export default useConnectHook;
