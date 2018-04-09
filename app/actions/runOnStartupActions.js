export const SET_ROS = 'SET_ROS';

export function setRunOnStartup(runOnStartup) {
  return {
    type: SET_ROS,
    runOnStartup
  };
}