import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './foundation/App';
import registerServiceWorker from './foundation/registerServiceWorker';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

let uri;

if (process.env.NODE_ENV === 'production')
  uri = 'https://habsci-server.herokuapp.com/graphql'
else
  uri = 'http://localhost:8000/graphql';

const client = new ApolloClient({
  link: new HttpLink({
    uri,
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
