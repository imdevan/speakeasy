// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { firebaseReducer } from 'react-redux-firebase'

import hotkey from './hotkey';
import profile from './profile';
import microphone from './microphone';
import runOnStartup from './runOnStartup';

const rootReducer = combineReducers({
  runOnStartup,
  hotkey,
  profile,
  microphone,
  router,
  firebase: firebaseReducer
});

export default rootReducer;
