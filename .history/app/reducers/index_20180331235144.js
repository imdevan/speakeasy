// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { firebaseReducer as firebase } from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form'

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
  form:formReducer,
  firebase
});

export default rootReducer;
