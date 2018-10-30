import { globalShortcut } from 'electron'
import robot from 'robotjs'
import cp from 'copy-paste'

import unhandled from 'electron-unhandled'
unhandled()

const registerKeys = keys => {
  keys.forEach(key => {
    const {hotkey, action} = key

    globalShortcut.register(hotkey, () => {
      const {type, value} = action

      switch(type){
        case 'combo':
          robot.keyTap(...value)
          break
        case 'type':
          robot.typeString(value)
          break
        case 'paste':
          // TODO: issue => paste only returns value (doesn't actually paste)
          cp.copy(value, () => {
            cp.paste(() => console.log('pasted', value))
          })
          break
        default:
          robot.keyTap(value)
          break
      }
      return false
    })
  })
}

/**
 * Add event listeners here
 * https://github.com/electron/electron/blob/master/docs/api/global-shortcut.md
 * https://github.com/electron/electron/blob/master/docs/api/accelerator.md
 * https://robotjs.io/docs/syntax
 * When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.
 */
const register = data => {
  registerKeys([{
    hotkey: 'F3',
    action: {
      type: 'type',
      value: 'zerg rush'
    }
  },{
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
