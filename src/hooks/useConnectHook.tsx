import { toast } from 'react-toastify';

import {
  setAccount,
  setChainId,
  setConnectAccount,
  setConnectionError,
  setDisconnectAccount,
  setIsConnected,
  setIsConnectionLoading,
  setIsConnectionModalOpen,
  setUserCollection,
} from '@/ducks';
import { LoopringService } from '@/lib/LoopringService';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ChainId } from '@loopring-web/loopring-sdk';
import { useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import useConnectHelper, {
  handleConnectI,
  handleErrorI,
  handleProcessingI,
} from '../helpers/useConnectHelper';
import { CHAINS, switchNetwork } from '@/helpers/chain';
import useCollectionHook from './useCollectionHook';
import { AccountInfoI, CollectionI } from '@/types';
import { getCookies, setCookie, deleteCookie } from 'cookies-next';

const useConnectHook = () => {
  const { getUserCollection } = useCollectionHook();

  const loopringService = useMemo(() => new LoopringService(), []);
  const dispatch = useAppDispatch();

  const { walletType, account } = useAppSelector((state) => {
    const { walletType, account } = state.webAppReducer;
    return { walletType, account };
  }, shallowEqual);

  const configuredChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

  const onWalletConnectHandler = async (
    connectedAccount: string,
    connectedChainId: ChainId | 'unknown'
  ) => {
    if (
      account !== connectedAccount &&
      connectedChainId === configuredChainId
    ) {
      dispatch(setDisconnectAccount(null));
    }

    if (connectedChainId !== configuredChainId) {
      toast.warn(`Connect to ${CHAINS[configuredChainId]}`);
      await switchNetwork();
      return;
    }

    if (account === connectedAccount && connectedChainId === configuredChainId)
      return;

    const { accInfo } = await loopringService.exchangeAPI.getAccount({
      owner: connectedAccount,
    });

    if (!accInfo) {
      dispatch(setConnectionError(true));
      dispatch(setIsConnectionModalOpen(true));
      return;
    }
    dispatch(setConnectionError(false));
    dispatch(setIsConnectionLoading(true));

    const accountDetails = await loopringService.unlockAccount(
      connectedAccount,
      walletType
    );

    dispatch(
      setConnectAccount({
        apiKey: accountDetails?.apiKey,
        account: connectedAccount,
        chainId: connectedChainId,
      })
    );

    setCookie('ACCOUNT', connectedAccount);
    setCookie('APIKEY', accountDetails?.apiKey);

    await initUserData(accountDetails as AccountInfoI);
  };

  const initUserData = async (accountDetails: AccountInfoI) => {
    // set user collections
    {
      const collections = await getUserCollection(accountDetails.accInfo.owner, accountDetails.apiKey);      
      if (collections) {
        dispatch(setUserCollection(collections));
      }
    }
  };

  useConnectHelper({
    handleAccountDisconnect: () => {
      console.log('handleAccountDisconnect:');
    },
    handleProcessing: ({ opts }: handleProcessingI) => {
      console.log('---> handleProcessing:', opts);

      console.log(opts);
    },
    handleError: (props: handleErrorI) => {
      console.log('---> handleError:', props);
      console.log('---> handleErrorMSG:', props);
      //@ts-ignore
      toast(props.opts.error.message, { type: 'error' });
    },
    handleConnect: async ({ accounts, chainId }: handleConnectI) => {
      await onWalletConnectHandler(accounts[0], chainId);

      console.log(
        'After connect >>,network part start: step1 networkUpdate',
        accounts[0]
      );
      console.log('After connect >>,network part done: step2 check account');
    },
  });
};

export default useConnectHook;
