import { globalShortcut } from 'electron';

import unhandled from 'electron-unhandled'
unhandled();

const register = (data) => {

  /**
   * Add event listeners here
   */
  // https://github.com/electron/electron/blob/master/docs/api/global-shortcut.md
  // https://github.com/electron/electron/blob/master/docs/api/accelerator.md
  // https://robotjs.io/docs/syntax
  console.log('events.register called');
  console.log(data);
  // initialize storage listener
  // const ret = globalShortcut.register('CommandOrControl+X', () => {
  //   console.log('CommandOrControl+X is pressed')
  //   robotjs.keyTap("X", "control");
  // })

  // if (!ret) {
  //   console.log('registration failed')
  // }

  // Check whether a shortcut is registered.
  // console.log(globalShortcut.isRegistered('CommandOrControl+X'))
}

const unRegisterAll = () => {
  console.log('events.unRegisterAll called');
  console.log(data);
  // globalShortcut.unregisterAll()
}

export default {
  register,
  unRegisterAll
}
