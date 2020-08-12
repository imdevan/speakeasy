// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from './index';

type RootType = {
  store: {},
  history: {}
};

 
/**
 * Returns root of React application. All things front end start here
 * @param {RootType} param0 obect with store and history passed to it
 */
export default function Root({ store, history }: RootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}
