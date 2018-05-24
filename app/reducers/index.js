// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { firebaseReducer as firebase } from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form'

import hotkeys from './hotkeys';
import currentUser from './currentUser';
import profile from './profile';
import microphone from './microphone';
import runOnStartup from './runOnStartup';
import popUp from './popUp';

const rootReducer = combineReducers({
  runOnStartup,
  hotkeys,
  currentUser,
  profile,
  microphone,
  router,
  popUp,
  form:formReducer,
  firebase
});

export default rootReducer;
