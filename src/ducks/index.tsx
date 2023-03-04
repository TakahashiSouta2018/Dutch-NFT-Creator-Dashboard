import { RootStateT } from '@/redux/store';
import { AccountInfoI } from '@/types';
import { ConnectorNames } from '@loopring-web/loopring-sdk';
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface WebAppReducerI {
  isConnected: boolean;
  walletType: ConnectorNames;
  accountInfo: AccountInfoI | null;
  connectedChainId: number | null;
}

// Define the initial state using that type
const initialState: WebAppReducerI = {
  isConnected: false,
  walletType: ConnectorNames.Unknown,
  accountInfo: null,
  connectedChainId: null,
};

export const webAppReducer: Slice<WebAppReducerI> = createSlice({
  name: 'webApp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setConnectedChainId: (state, action: PayloadAction<number | null>) => {
      state.connectedChainId = action.payload;
    },
    setWalletType: (state, action: PayloadAction<ConnectorNames>) => {
      state.walletType = action.payload;
    },
    setAccountInfo: (state, action: PayloadAction<AccountInfoI | null>) => {
      state.accountInfo = action.payload;
    },
  },
});

export const {
  setAccountInfo,
  setConnectedChainId,
  setIsConnected,
  setWalletType,
} = webAppReducer.actions;

// Other code such as selectors can use the imported `RootStateT` type
export const selectWebApp = (state: RootStateT): WebAppReducerI =>
  state.webAppReducer;

export default webAppReducer.reducer;
