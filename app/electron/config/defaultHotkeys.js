const defaultHotkeys = [{
  hotkey: 'F3',
  action: {
    type: 'type',
    value: 'zerg rush'
  }
}, {
  hotkey: 'CommandOrControl+F3',
  action: {
    type: 'combo',
    value: ['printscreen', 'command']
  }
}, {
  hotkey: 'F4',
  action: {
    type: 'combo',
    value: ['left', 'alt']
  }
}, {
  hotkey: 'F5',
  action: {
    type: 'combo',
    value: ['right', 'alt']
  }
}, {
  hotkey: 'F6',
  action: {
    type: 'media',
    value: 'audio_mute'
  }
}, {
  hotkey: 'F7',
  action: {
    type: 'media',
    value: 'audio_prev'
  }
}, {
  hotkey: 'F8',
  action: {
    type: 'media',
    value: 'audio_play'
  }
}, {
  hotkey: 'F9',
  action: {
    type: 'media',
    value: 'audio_next'
  }
}, {
  hotkey: 'F10',
  action: {
    type: 'media',
    value: 'audio_vol_down'
  }
}, {
  hotkey: 'F11',
  action: {
    type: 'media',
    value: 'audio_vol_up'
  }
}, {
  hotkey: 'CommandOrControl+F12',
  action: {
    type: 'media',
    value: 'audio_stop'
  }
}]

export default defaultHotkeys;