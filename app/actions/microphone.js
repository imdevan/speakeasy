export const SET_MUTE = 'SET_MUTE';

export function mute(value) {
  return {
    type: SET_MUTE,
    value
  };
}