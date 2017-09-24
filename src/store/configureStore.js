import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
const dev = process.env.NODE_ENV !== 'production';

const reduxDevTools = dev && typeof window !== 'undefined' && window.devToolsExtension;

const middleware = process.env.NODE_ENV !== 'production' ?
  [thunk, logger] :
  [thunk];

// Dev tools
const enhancers = compose(
  applyMiddleware(...middleware),
  reduxDevTools ? window.devToolsExtension() : f => f
);

export default function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    enhancers
  );
}
