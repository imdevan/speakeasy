import { SET_CURRENT_USER, UPDATE_CURRENT_USER } from '../actions/currentUserActions';

export default function currentUser(state = {signedIn: false}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUser;
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        ...action.props
      }
    default:
      return state;
  }
}
