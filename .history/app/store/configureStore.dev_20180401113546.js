import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import * as hotKeyActions from '../actions/hotKey';
import * as runOnStartupActions from '../actions/runOnStartup';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase'
const history = createHashHistory();

// Firebase config
const fbConfig = {
  apiKey: "AIzaSyBfKezBXsgyQaYbBcwxx1vC_nvbxunJkjA",
  authDomain: "major-key-mapper.firebaseapp.com",
  databaseURL: "https://major-key-mapper.firebaseio.com",
  storageBucket: "major-key-mapper.appspot.com",
};
// react-redux-firebase options
const rrfConfig = {
  userProfile: 'users', // firebase root where user profiles are
  enableLogging: true, // enable/disable Firebase's database loggingstored
}
firebase.initializeApp(fbConfig)

// initialize firestore
// firebase.firestore() // <- needed if using firestore

const configureStore = (initialState) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [reactReduxFirebase(firebase, rrfConfig)];

  // Thunk Middleware
  middleware.push(thunk.withExtraArgument(getFirebase));

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // Redux DevTools Configuration
  const actionCreators = {
    ...runOnStartupActions,
    ...hotKeyActions,
    ...routerActions,
  };
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
      actionCreators,
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
};

export default { configureStore, history };
