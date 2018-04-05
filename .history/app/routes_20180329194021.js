/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './views/App';
import Login from './views/Login';
import Home from './views/Home';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  </App>
);
