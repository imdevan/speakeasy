import toArray from '../utils/toArray'

const DEFAULT_HOTKEY_PROFILES = {
  0: {
    name: 'profile 1',
    hotkeys: {
      0: {
        hotkey: 'F7',
        action: 'audio_prev'
      },
      1: {
        hotkey: 'F8',
        action: 'audio_play'
      },
      2: {
        hotkey: 'F9',
        action: 'audio_next'
      },
      3: {
        hotkey: 'F10',
        action: 'audio_vol_down'
      },
      4: {
        hotkey: 'F11',
        action: 'audio_vol_up'
      }
    }
  },
  1: {
    name: 'Profile 2',
    hotkeys: {}
  },
  2: {
    name: 'Profile 3',
    hotkeys: {}
  },
  3: {
    name: 'Profile 4',
    hotkeys: {}
  },
  4: {
    name: 'Profile 5',
    hotkeys: {}
  }
}

const defaultsAsArray = () => {
  return toArray(DEFAULT_HOTKEY_PROFILES).map(prof => {
    return {
      ...prof,
      hotkeys: toArray(prof.hotkeys)
    }
  })
}

export default { DEFAULT_HOTKEY_PROFILES, defaultsAsArray }
