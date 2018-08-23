export const SET_SETUP_COMPLETE = 'SET_SETUP_COMPLETE';

export function setRunOnStartup(setupComplete) {
  return {
    type: SET_SETUP_COMPLETE,
    setupComplete
  };
}