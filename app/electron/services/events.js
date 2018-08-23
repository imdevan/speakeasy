import { globalShortcut } from 'electron'
import robot from 'robotjs'
import cp from 'copy-paste'

import unhandled from 'electron-unhandled'
unhandled()

const registerKeys = keys => {
  console
  keys.forEach(key => {
    console.log('events.register key', key);

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
          console.log('copied', value);

          cp.copy(value, () => {
            console.log('copied', value)
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
  console.log('events.register data', data);
  registerKeys(data)
}

const unRegisterAll = () => {
  console.log('events.unRegisterAll called')
  globalShortcut.unregisterAll()
}

export default {
  register,
  unRegisterAll
}
