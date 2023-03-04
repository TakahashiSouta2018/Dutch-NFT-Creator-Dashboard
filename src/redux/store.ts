import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import storageSession from 'redux-persist/lib/storage/session';

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import webAppReducer from '@/ducks';

const webAppPersistConfig = {
  key: 'webAppReducer',
  storage: storageSession,
  // blacklist: ['isLoggedIn']
};

const rootReducer = combineReducers({
  webAppReducer: persistReducer(webAppPersistConfig, webAppReducer),
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootStateT = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStateT> = useSelector;
export const persistor = persistStore(store);

export default store;
