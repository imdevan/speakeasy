import { SET_MUTE } from '../actions/microphone';

export default function microphone(state = {
  mute: false
}, action) {
  switch (action.type) {
    case SET_MUTE:
      return {
        ...state,
        mute: action.value
      };
    default:
      return state;
  }
}
