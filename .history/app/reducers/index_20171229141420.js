// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import hotkey from './hotkey';
import microphone from './microphone';
import runOnStartup from './runOnStartup';

const rootReducer = combineReducers({
  runOnStartup,
  hotkey,
  microphone,
  router,
});

export default rootReducer;
