/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './views/App';
import HomePage from './views/HomePage';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
