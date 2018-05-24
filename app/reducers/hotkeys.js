import { SET_ACTIVE_HOTKEY_PROFILE, SET_HOTKEY_PROFILES, ADD_HOTKEY } from '../actions/hotkeyActions'

export default function (state = {
  initialized: false,
  activeProfile: 0,
  profiles: []
}, action) {
  switch (action.type) {
    case SET_ACTIVE_HOTKEY_PROFILE:
      return {
        ...state,
        activeProfile: action.activeProfile
      }

    case SET_HOTKEY_PROFILES:
      return {
        ...state,
        profiles: action.profiles,
        initialized: true
      }

    case ADD_HOTKEY:
      return {
        ...state,
        profiles: state.profiles[state.activeProfile].push(action.hotkey)
      }

    default:
      return state
  }
}
