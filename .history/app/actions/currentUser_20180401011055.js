export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(currentUser) {
  return {
    type: SET_CURRENT_USER,
    currentUser
  };
}

export function userSignedIn(currentUser) {
  return {
    type: SET_CURRENT_USER,
    currentUser: {
      ...currentUser,
      signedIn: true
    }
  };
}

export function userSignedOut(currentUser) {
  return {
    type: SET_CURRENT_USER,
    currentUser: {signedIn: false}
  };
}
