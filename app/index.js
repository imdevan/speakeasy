import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { store, history } from './store';

import Root from './routes/Root';

import './styles/index.global.scss';

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./routes/Root', () => {
    const NextRoot = require('./routes/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
