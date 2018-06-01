import hotkeys from '../config/hotkeys'

import { setDefaultHotkeys } from './hotkeyActions'

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

/**
 * Override current user in store
 * @param {*} currentUser new user object
 */
const setUser = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser
})

/**
 * Update user only overridding passed in props
 * @param {*} props properties to be updated
 */
const updateCurrentUser = props => ({ type: UPDATE_CURRENT_USER, props })

/**
 * Set user to logged in in store
 * @param {*} fbUser User from firebase login / create / update
 */
const login = fbUser => (dispatch => {
  const { email, displayName } = fbUser

  dispatch(setUser({
    signedIn: true,
    email,
    displayName: displayName || email
  }))
})

export function fill() {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const nextProps = {
      hotKeyProfiles: hotkeys.DEFAULT_HOTKEY_PROFILES,
      activeProfile: 0
    };

    firebase.updateProfile(nextProps).then(user => {
      if(user){
        dispatch(updateCurrentUser(nextProps))
      }
    });
  }
}

/**
 * Create new firebase user login
 * @param {*} options email & password props required
 */
const createUser = ({ email, password }) => {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()

    firebase.createUser({ email, password }, {
        email,
        displayName: email,
      })
      .then(user => {
        dispatch(login(user))
        dispatch(setDefaultHotkeys())
      })
      .catch(error => console.error('ERROR WITH CREATING USER ', error))
  }
}

/**
 * Login or create user
 * @param options Must include email and password props
 */
export const loginOrCreate = (options) =>  {
  return (dispatch, getState, getFirebase) => {
    const firebase = getFirebase()

    firebase.login(options)
      .then(data => dispatch(login(data.user)))
      .catch((error) => {

        if (error.code === 'auth/user-not-found')
          dispatch(createUser(options))

        else
          console.error('ERROR LOGGING IN', error);
      })
  }
}

// export function loginOrCreate({email, password}) {
//   return (dispatch, getState, getFirebase) => {
//     const firebase = getFirebase();

//     firebase.login({email, password}).catch((error) => {
//       if(error.code === 'auth/user-not-found') {
//         firebase.createUser({email, password}, {
//             email,
//             displayName: email,
//             activeProfile: 0,
//             hotKeyProfiles: hotkeys.DEFAULT_HOTKEY_PROFILES
//           }).then(user => {
//             const currentUser = {
//               email,
//               displayName: user.displayName,
//               activeProfile: user.activeProfile,
//               hotKeyProfiles: hotkeys.DEFAULT_HOTKEY_PROFILES
//             }

//             dispatch(login(user))
//           }).catch(err => {
//             console.log('ERROR WITH CREATING USER ', err);
//           })
//       }
//     });
//   }
// }

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
