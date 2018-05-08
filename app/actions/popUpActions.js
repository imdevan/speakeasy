export const CREATE_POPUP = 'CREATE_POPUP';
export const DESTORY_POPUP = 'DESTORY_POPUP';
export const SHOW_POPUP = 'SHOW_POPUP';
export const HIDE_POPUP = 'HIDE_POPUP';

export function create(popUpName, onShow, onHide) {
  return { type: CREATE_POPUP, popUpName, onShow, onHide };
}

export function destroy(popUpName) {
  return { type: DESTORY_POPUP, popUpName };
}

export function show(popUpName, show = true) {
  return (dispatch, getState, getFirebase) => {
    const popUp = getState().popUp[popUpName];

    if(show && popUp.onShow)
      popUp.onShow();

    if(!show && popUp.onHide)
      popUp.onHide();

    dispatch({ type: SHOW_POPUP, popUpName, show })
  }
}

export function hide(popUpName) {
  return (dispatch, getState, getFirebase) => {
    const popUp = getState().popUp[popUpName];

  if (popUp.onHide)
      popUp.onHide();

    dispatch({ type: HIDE_POPUP, popUpName })
  }
}
