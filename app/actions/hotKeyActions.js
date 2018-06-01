import { updateProfile as updateUserProfile } from './currentUserActions'

import hotkeys from '../config/hotkeys'
import toArray from '../utils/toArray'

export const SET_HOTKEY_PROFILES = 'SET_HOTKEY_PROFILES'
export const SET_ACTIVE_HOTKEY_PROFILE = 'SET_ACTIVE_HOTKEY_PROFILE'
export const ADD_HOTKEY = 'ADD_HOTKEY'

/**
 * Overrides all profiles
 * @param {*} profiles next profiles
 */
export const setProfiles = profiles => ({
  type: SET_HOTKEY_PROFILES,
  profiles
})

/**
 * Sets the active profile
 * @param {number} activeProfile profile to switch to
 */
export const setActive = activeProfile => ({
  type: SET_ACTIVE_HOTKEY_PROFILE,
  activeProfile
})

/**
 * Adds hotkey to current Profile
 * @param {*} hotkey Hotkey to add
 */
export const add = hotkey => {
  return (dispatch, getState) => {
    const { activeProfile, profiles } = getState().hotkeys

    if (!hotkey)
      return null

    debugger
    if (profiles[activeProfile].hotkeys)
      profiles[activeProfile].hotkeys.push({ hotkey })
    else
      profiles[activeProfile].hotkeys = [{ hotkey }]

    dispatch(updateProfile(profiles))
    dispatch(updateUserProfile({ profiles }))
  }
}

/**
 * Changes single hotkey trigger
 * @param {*} hotkey Hotkey to edit
 */
export const editHotkey = hotkey => {
  return (dispatch, getState) => {
    const { profile, profiles } = getState()
    const { activeProfile } = profile

    if (profiles[activeProfile].hotkeys)
      profiles[activeProfile].hotkeys.push({ hotkey })
    else
      profiles[activeProfile].hotkeys = [{ hotkey }]

    dispatch(updateUserProfile({ profiles }))
  }
}

/**
 * Removes a hotkey from the active profile
 * @param {*} hotkey Hotkey to remove
 */
export const removeHotkey = hotkey => ({
  type: REMOVE_HOTKEY,
  hotkey
})

/**
 * Set's default hotkey profiles from config
 */
export const setDefaultHotkeys = () => (
  (dispatch, getState, getFirebase) => {
  const firebase = getFirebase()


    firebase.updateProfile(hotkeys.DEFAULT_HOTKEY_PROFILES)
    return dispatch(setProfiles(hotkeys.defaultsAsArray()))
})
