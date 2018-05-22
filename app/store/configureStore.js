import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

import rootReducer from '../reducers'
import * as hotkeyActions from '../actions/hotkeyActions'
import * as runOnStartupActions from '../actions/runOnStartupActions'

const history = createHashHistory()

const dev = process.env.NODE_ENV !== 'production'

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBfKezBXsgyQaYbBcwxx1vC_nvbxunJkjA",
  authDomain: "major-key-mapper.firebaseapp.com",
  databaseURL: "https://major-key-mapper.firebaseio.com",
  storageBucket: "major-key-mapper.appspot.com",
}
  // react-redux-firebase options
const rrfConfig = {
  userProfile: 'users', // fireb  ase root where user profiles are
  enableLogging: true, // enable/disable Firebase's database loggingstored
}

firebase.initializeApp(firebaseConfig)

const configureStore = (initialState) => {
  const devMiddleWare = dev ? [createLogger()] : []
  const middleware = [
    thunk.withExtraArgument(getFirebase), // thunk + firebase
    routerMiddleware(history),            // Redux router
    ...devMiddleWare                      // Logger if in dev mode
  ]

  const enhancers = [
    reactReduxFirebase(firebase, rrfConfig),  // Firebase
    applyMiddleware(...middleware)            // Middleware
  ]

  // Create Store
  const store = createStore(
    rootReducer,
    initialState,
    compose(...enhancers)
  )

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    )
  }

  return store
}

export default { configureStore, history }
