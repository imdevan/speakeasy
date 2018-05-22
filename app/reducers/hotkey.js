import { SET_HOTKEY } from '../actions/hotkeyActions';

export default function (state = '~', action) {
  switch (action.type) {
    case SET_HOTKEY:
      return action.hotkey;
    default:
      return state;
  }
}
