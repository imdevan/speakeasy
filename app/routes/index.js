/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Routes from './index';
import App from './App';
import Home from './Home';
import Login from './Login';
import Settings from './Settings';

type RootType = {
  store: {},
  history: {}
};

 
/**
 * Returns root of React application. All things front end start here
 * @param {RootType} param0 obect with store and history passed to it
 */
export default ({ store, history }: RootType) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route path="/logout" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={Home} />
          </Switch>
        </App>
      </ConnectedRouter>
    </Provider>
  );
}