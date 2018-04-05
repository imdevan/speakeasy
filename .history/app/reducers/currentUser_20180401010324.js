import { SET_CURRENT_USER } from '../actions/currentUser';

export default function currentUser(state = {signedIn: false}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:a
      return action.currentUser;
    default:
      return state;
  }
}
