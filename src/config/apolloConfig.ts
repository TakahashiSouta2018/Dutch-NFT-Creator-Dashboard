import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloConfig = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/loopring/loopring',
  cache: new InMemoryCache(),
});

export default apolloConfig;