import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import webAppReducer from '@/ducks';
import createPageReducer from '@/components/create/ducks';
import dashboardPageReducer from '@/components/dashboard/ducks';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

const webAppPersistConfig = {
  key: 'webAppReducer',
  storage: storage,
  // blacklist: ['isLoggedIn']
};

const createPagePersistConfig = {
  key: 'createPageReducer',
  storage: storage,
  blacklist: ['draftNFTs', 'mintModal'],
};

const dashboardPagePersistConfig = {
  key: 'dashboardPageReducer',
  storage: storage,
  blacklist: ['selectedNFTs', 'collectionNfts', 'trackList'],
};

const rootReducer = combineReducers({
  webAppReducer: persistReducer(webAppPersistConfig, webAppReducer),
  createPageReducer: persistReducer(createPagePersistConfig, createPageReducer),
  dashboardPageReducer: persistReducer(
    dashboardPagePersistConfig,
    dashboardPageReducer
  ),
});

const masterReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // new state
    };
  } else return rootReducer(state, action);
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: false,
    middleware: [thunk],
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = typeof store.dispatch;
export type RootStateT = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateT> = useSelector;

export const persistor = persistStore(store);
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
