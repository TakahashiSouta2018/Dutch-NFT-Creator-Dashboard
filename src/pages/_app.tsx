import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { createGlobalStyle } from 'styled-components';
import { persistor, store, wrapper } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import apolloConfig from '@/config/apolloConfig';
import { Provider } from 'react-redux';

const GlobalStyle = createGlobalStyle`
  :root {
    --active-color: black;
    --breadcrumb-color: rgba(0, 0, 0, 0.6);
    --border-color: rgba(0, 0, 0, .7);
  }

  [class="dark"] {
    --active-color: white;
    --breadcrumb-color: rgba(255, 255, 255, 0.6);
    --border-color: rgba(255, 255, 255, .7);
  }
`;

export function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <ThemeProvider enableSystem={false} attribute="class">
          <ApolloProvider client={apolloConfig}>
            <Component {...pageProps} />
          </ApolloProvider>
          <ToastContainer />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(App);
