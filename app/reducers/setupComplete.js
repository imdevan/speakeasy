import { SET_SETUP_COMPLETE } from '../actions/setupCompleteActions';

export default function runOnStartup(state = true, action) {
  switch (action.type) {
    case SET_SETUP_COMPLETE:
      return action.setUpComplete;
    default:
      return state;
  }
}
