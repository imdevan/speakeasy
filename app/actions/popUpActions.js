export const CREATE_POPUP = 'CREATE_POPUP';
export const DESTORY_POPUP = 'DESTORY_POPUP';
export const SHOW_POPUP = 'SHOW_POPUP';
export const HIDE_POPUP = 'HIDE_POPUP';

export function create(popUpName, show = false) {
  return { type: CREATE_POPUP, popUpName, show };
}

export function destroy(popUpName) {
  return { type: DESTORY_POPUP, popUpName };
}

export function show(popUpName, show = true) {
  return { type: SHOW_POPUP, popUpName, show };
}

export function hide(popUpName) {
  return { type: HIDE_POPUP, popUpName };
}
