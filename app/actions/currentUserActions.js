import hotKeys from '../config/hotKeys'

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

export function login(currentUser) {
  return {
    type: SET_CURRENT_USER,
    currentUser: {
      ...currentUser,
      signedIn: true
    }
  };
}

export function fill() {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const nextProps = {
      hotKeyProfiles: hotKeys.DEFAULT_HOTKEY_PROFILES,
      activeProfile: 0
    };

    firebase.updateProfile(nextProps).then(user => {
      if(user){
        debugger
        dispatch(updateCurrentUser(nextProps))
      }
    });
  }
}

export function loginOrCreate({email, password}) {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    firebase.login({email, password}).catch((error) => {
      if(error.code === 'auth/user-not-found') {
        firebase.createUser({email, password}, {
            email,
            displayName: email,
            activeProfile: 0,
            hotKeyProfiles: hotKeys.DEFAULT_HOTKEY_PROFILES
          }).then(user => {
            const currentUser = {
              email,
              displayName: user.displayName,
              activeProfile: user.activeProfile,
              hotKeyProfiles: hotKeys.DEFAULT_HOTKEY_PROFILES
            }

            dispatch(login(currentUser))
          }).catch(err => {
            console.log('ERROR WITH CREATING USER ', err);
          })
      }
    });
  }
}

function updateCurrentUser(props){
  return {
    type: UPDATE_CURRENT_USER,
    props: props
  }
}

export function updateProfile(props){
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()

    dispatch(updateCurrentUser(props))
    return firebase.updateProfile(props)
  }
}

export function logout() {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()

    firebase.logout()
    dispatch(userSignedOut())
  }
}

export function userSignedOut() {
  return {
    type: SET_CURRENT_USER,
    currentUser: {signedIn: false}
  };
}
