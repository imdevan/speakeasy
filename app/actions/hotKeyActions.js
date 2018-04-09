export const SET_HOTKEY = 'SET_HOTKEY';

export function setHotkey(hotkey) {
  return {
    type: SET_HOTKEY,
    hotkey
  };
}