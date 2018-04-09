import { SET_ROS } from '../actions/runOnStartupActions';

export default function runOnStartup(state = true, action) {
  switch (action.type) {
    case SET_ROS:
      return action.runOnStartup;
    default:
      return state;
  }
}
