import { SET_ROS } from '../actions/runOnStartup';

export default function runOnStartup(state = true, action) {
  switch (action.type) {
    case SET_ROS:
      return action.runOnStartup;
    default:
      return state;
  }
}