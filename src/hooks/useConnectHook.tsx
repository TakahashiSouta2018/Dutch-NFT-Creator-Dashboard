import { toast } from 'react-toastify';

import { setAccountInfo, setConnectionError, setIsConnected, setIsConnectionLoading, setIsConnectionModalOpen, setUserCollection } from '@/ducks';
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

const useConnectHook = () => {
  const { getUserCollection } = useCollectionHook();

  const loopringService = useMemo(() => new LoopringService(), []);
  const dispatch = useAppDispatch();

  const { walletType, accountInfo } = useAppSelector((state) => {
    const { walletType, accountInfo } = state.webAppReducer;
    return { walletType, accountInfo };
  }, shallowEqual);


  const onWalletConnectHandler = async (account: string, chainId: ChainId | 'unknown') => {
    const networkId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

    if (
      accountInfo?.accInfo?.owner !== account &&
      chainId == networkId
    ) {
      dispatch(setAccountInfo(null));
      dispatch(setIsConnected(false));
    }

    if (chainId !== networkId) {
      toast(`Connect to ${CHAINS[networkId].name}`, { type: 'warning' });
      await switchNetwork();
      return;
    }

    if (accountInfo?.accInfo?.owner === account) return;

    const { accInfo } = await loopringService.exchangeAPI.getAccount({
      owner: account,
    });
    
    if (!accInfo) {
      dispatch(setConnectionError(true));
      dispatch(setIsConnectionModalOpen(true));
      return 
    }
    dispatch(setConnectionError(false));
    dispatch(setIsConnectionLoading(true));

    const accountDetails = await loopringService.unlockAccount(
      account,
      walletType
    );
    const userExist = accountDetails ? true : false;
    
    dispatch(setIsConnectionModalOpen(false));
    dispatch(setIsConnectionLoading(false));
    dispatch(setAccountInfo(accountDetails));
    dispatch(setIsConnected(userExist));

    await initUserData(accountDetails as AccountInfoI);
  }

  const initUserData = async(accountDetails: AccountInfoI) => {
   
    // set user collections
    {
      const collectionResponse = await getUserCollection(accountDetails);
      if (collectionResponse && collectionResponse.collections) 
        dispatch(setUserCollection(collectionResponse.collections));
    }

  }

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
