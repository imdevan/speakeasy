/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './views/App';
import Login from './views/Login';
import Settings from './views/Settings';
import Home from './views/Home';

export default () => (
  <App>
    <Switch>
      <Route path="/logout" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/settings" component={Settings} />
      <Route path="/" component={Home} />
    </Switch>
  </App>
);
