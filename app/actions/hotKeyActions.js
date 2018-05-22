import {updateProfile as updateUserProfile} from './currentUserActions';

export const SET_HOTKEY_PROFILES = 'SET_HOTKEY_PROFILES';
export const ADD_HOTKEY = 'ADD_HOTKEY';

const setProfiles = hotkeyProfiles => ({
  type: SET_HOTKEY_PROFILES,
  hotkeyProfiles
})

export const load = () => ((dispatch, getState) => {
  // Load from raezac
})

export const add = hotkey => {
  return (dispatch, getState) => {
    const {
      profile,
    } = this.props;

    let {
      activeProfile,
      hotkeyProfiles
    } = profile;

    if (!hotkey)
      return null;

    if (hotkeyProfiles[activeProfile].hotkeys)
      hotkeyProfiles[activeProfile].hotkeys.push({ hotkey });
    else
      hotkeyProfiles[activeProfile].hotkeys = [{ hotkey }];

    dispatch(setProfiles(hotkeyProfiles))
    dispatch(updateUserProfile({hotkeyProfiles}))
  }
}

export const editHotkey = hotkey => {
  return (dispatch, getState) => {
    const { profile, hotkeyProfiles } = getState();
    const { activeProfile } = profile;

    if (hotkeyProfiles[activeProfile].hotkeys)
      hotkeyProfiles[activeProfile].hotkeys.push({ hotkey });
    else
      hotkeyProfiles[activeProfile].hotkeys = [{ hotkey }];

    dispatch(updateUserProfile({ hotkeyProfiles }))
  }
}

export const removeHotkey = hotkey => ({
  type: REMOVE_HOTKEY,
  hotkey
})
