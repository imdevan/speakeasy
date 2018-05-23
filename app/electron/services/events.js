import { globalShortcut } from 'electron'
import robot from 'robotjs'

import unhandled from 'electron-unhandled'
unhandled()

const registerKeys = keys => {
  keys.forEach(key => {
    if (key.action) {
      const {hotKey, action} = key

      globalShortcut.register(hotKey, () => {
        console.log(`${hotKey} is pressed`, action)

        if (Array.isArray(action))
          robot.keyTap(...action)
        else
          robot.keyTap(action)
      })
    }
  })
}

const register = data => {
  /**
   * Add event listeners here
   */
  // https://github.com/electron/electron/blob/master/docs/api/global-shortcut.md
  // https://github.com/electron/electron/blob/master/docs/api/accelerator.md
  // https://robotjs.io/docs/syntax
  console.log('EVENTS REGISTER DATA');
  console.log(data);
  console.log(data);

  registerKeys([{
      hotKey: 'CommandOrControl+F3',
      action: ['printscreen', 'command']
    }, {
      hotKey: 'F4',
      action: ['left', 'alt']
    }, {
      hotKey: 'F5',
      action: ['right', 'alt']
    }, {
      hotKey: 'F6',
      action: 'audio_mute'
    }, {
      hotKey: 'F7',
      action: 'audio_prev'
    }, {
      hotKey: 'F8',
      action: 'audio_play'
    }, {
      hotKey: 'F9',
      action: 'audio_next'
    }, {
      hotKey: 'F10',
      action: 'audio_vol_down'
    }, {
      hotKey: 'F11',
      action: 'audio_vol_up'
    }, {
      hotKey: 'CommandOrControl+F12',
      action: 'audio_stop'
    }])
}

const unRegisterAll = () => {
  console.log('events.unRegisterAll called')
  globalShortcut.unregisterAll()
}

export default {
  register,
  unRegisterAll
}
