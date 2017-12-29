import { SET_HOTKEY } from '../actions/hotkey';

export default function hotkey(state = '~', action) {
  switch (action.type) {
    case SET_HOTKEY:
      return action.hotkey;
    default:
      return state;
  }
}
