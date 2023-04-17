import { RootStateT } from '@/redux/store';
import { AccountInfoI, CollectionI } from '@/types';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// Define a type for the slice state
export interface WebAppReducerI {
  isConnected: boolean;
  walletType: ConnectorNames;
  apiKey: string | null;
  account: string | null;
  chainId: number | null;
  accountId: number | null;
  connectionError: boolean;
  isConnectionLoading: boolean;
  isConnectionModalOpen: boolean;
  userCollection: CollectionI[];
}
export interface ConnectedAccountI {
  apiKey: string;
  account: string;
  chainId: number;
  accountId: number;
}

// Define the initial state using that type
const initialState: WebAppReducerI = {
  isConnected: false,
  walletType: ConnectorNames.Unknown,
  apiKey: null,
  account: null,
  chainId: null,
  connectionError: false,
  isConnectionLoading: false,
  isConnectionModalOpen: false,
  userCollection: [],
  accountId: null
};

export const webAppReducer: Slice<WebAppReducerI> = createSlice({
  name: 'webApp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setChainId: (state, action: PayloadAction<number | null>) => {
      state.chainId = action.payload;
    },
    setWalletType: (state, action: PayloadAction<ConnectorNames>) => {
      state.walletType = action.payload;
    },
    setApiKey: (state, action: PayloadAction<string | null>) => {
      state.apiKey = action.payload;
    },
    setAccount: (state, action: PayloadAction<string | null>) => {
      state.account = action.payload;
    },
    setConnectionError: (state, action: PayloadAction<boolean>) => {
      state.connectionError = action.payload;
    },
    setIsConnectionLoading: (state, action: PayloadAction<boolean>) => {
      state.isConnectionLoading = action.payload;
    },
    setIsConnectionModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isConnectionModalOpen = action.payload;
    },
    setDisconnectAccount: (state) => {
      state.chainId = null;
      state.account = null;
      state.apiKey = null;
      state.accountId = null;
      state.isConnected = false;
    },
    setConnectAccount: (state, action: PayloadAction<ConnectedAccountI>) => {
      state.chainId = action.payload.chainId;
      state.account = action.payload.account;
      state.apiKey = action.payload.apiKey;
      state.accountId = action.payload.accountId;
      state.isConnected = true;
      state.isConnectionLoading = false;
      state.isConnectionModalOpen = false;
    },
    setUserCollection: (state, action: PayloadAction<CollectionI[]>) => {
      state.userCollection = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.webApp,
      };
    },
  },
});

export const {
  setApiKey,
  setChainId,
  setAccount,
  setIsConnected,
  setWalletType,
  setConnectionError,
  setIsConnectionLoading,
  setIsConnectionModalOpen,
  setUserCollection,
  setConnectAccount,
  setDisconnectAccount,
} = webAppReducer.actions;

// Other code such as selectors can use the imported `RootStateT` type
export const selectWebApp = (state: RootStateT): WebAppReducerI =>
  state.webAppReducer;

export default webAppReducer.reducer;
