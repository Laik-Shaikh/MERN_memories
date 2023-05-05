import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore ,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='354431893451-ps2chdos37mbaor8hq826ghel4h63gvs.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);


