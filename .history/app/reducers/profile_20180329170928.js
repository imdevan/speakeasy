import { SET_ACTIVE_PROFILE } from '../actions/profile';

export default function microphone(state = {
  mute: false
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
