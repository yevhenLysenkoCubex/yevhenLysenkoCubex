import { InMemoryCache, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://one-check-orchestrator-staging.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export default client;
