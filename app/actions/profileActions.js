export const SET_ACTIVE_PROFILE = 'SET_ACTIVE_PROFILE';

export function setActiveProfile(activeProfile) {
  return {
    type: SET_ACTIVE_PROFILE,
    activeProfile
  };
}
