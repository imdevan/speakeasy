import { SET_ACTIVE_PROFILE } from '../actions/profile';

export default function microphone(state = {
  activeProfile: 1
}, action) {
  switch (action.type) {
    case SET_ACTIVE_PROFILE:
      return {
        ...state,
        activeProfile: action.activeProfile
      };
    default:
      return state;
  }
}
