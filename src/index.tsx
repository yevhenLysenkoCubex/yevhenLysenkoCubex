import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloProvider } from '@apollo/client/react';
import client from './graphql/index';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import App from './App';
import './index.css';

const CLIENT_ID = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID ?? ''}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Router>
            <App />
          </Router>
        </ApolloProvider>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
