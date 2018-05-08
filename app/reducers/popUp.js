import * as types from '../actions/popUpActions';

export default function popUp(state = {}, action){
  switch(action.type){
    case types.CREATE_POPUP:
      return {
        ...state,
        [action.popUpName]: {
          show: action.show,
          onShow: action.onShow,
          onHide: action.onHide,
        }
      };

    case types.DESTORY_POPUP:
      return (() => {
        const nextState = state;
        delete nextState[action.popUpName];
        return nextState
      })()

    case types.SHOW_POPUP:
      return {
        ...state,
        [action.popUpName]: {
          ...state[action.popUpName],
          show: action.show
        }
      };

    case types.HIDE_POPUP:
      return {
        ...state,
        [action.popUpName]: {
          ...state[action.popUpName],
          show: false
        }
      };

    default:
      return state;
  }
}
