import { useEffect, useMemo } from 'react';
import { provider } from 'web3-core';
import {
  walletServices,
  Commands,
  ErrorType,
  ProcessingType,
} from '@loopring-web/web3-provider';
import { ChainId } from '@loopring-web/loopring-sdk';

export interface handleProcessingI {
  type: keyof typeof ProcessingType;
  opts: any;
}

export interface handleErrorI {
  type: keyof typeof ErrorType;
  errorObj: any;
}

export interface handleConnectI {
  accounts: string;
  provider: provider;
  chainId: ChainId | 'unknown';
}

interface PropsI {
  handleProcessing: (props: handleProcessingI) => void;
  handleError: (props: handleErrorI) => void;
  // handleChainChanged?: (chainId: string) => void,
  handleConnect: (props: handleConnectI) => void;
  handleAccountDisconnect: () => void;
}

const useConnectHelper = ({
  handleConnect,
  handleAccountDisconnect,
  handleError,
  handleProcessing,
}: PropsI) => {
  const subject = useMemo(() => walletServices.onSocket(), []);

  useEffect(() => {
    const subscription = subject.subscribe(
      ({ data, status }: { status: keyof typeof Commands; data?: any }) => {
        switch (status) {
          case 'Error':
            handleError(data);
            break;
          case 'Processing':
            handleProcessing(data);
            break;
          // case 'ChangeNetwork':
          //     // {chainId} = data ? data : {chainId: undefined};
          //     handleChainChanged ? handleChainChanged(data.chainId) : undefined;
          //     break
          case 'ConnectWallet': // provider, accounts, chainId, networkId
            const { accounts, provider, chainId } = data
              ? data
              : {
                  accounts: undefined,
                  provider: undefined,
                  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
                };
            handleConnect({ accounts, provider, chainId });
            break;
          case 'DisConnect':
            handleAccountDisconnect();
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [subject]);
};

export default useConnectHelper;
