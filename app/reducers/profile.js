import { SET_ACTIVE_PROFILE } from '../actions/profileActions';

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
