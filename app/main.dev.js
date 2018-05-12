/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, Tray, Menu } from 'electron'
import path from 'path'
import unhandled from 'electron-unhandled'
unhandled()

// import MainWindow from './electron/Window'
// import Tray from './electron/Tray'
import watchFile from './electron/services/watchFile'
import events from './electron/services/events'

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    // Unregister all shortcuts.
    // events.unRegisterAll()
    // app.quit()
  }
})

let _window
let _tray
app.on('ready', async () => {
  if (process.platform === 'darwin') {
    app.dock.hide() // hide app from dock on Mac OS
  }

  // init file watch
  watchFile.init(events.register)

  // init window
  _window = new BrowserWindow()
  _window.loadURL(`file://${__dirname}/app.html`)
  Menu.setApplicationMenu(null)

  // init tray icon
  _tray = new Tray(path.join(__dirname, 'ok-emoji.png'), _window)
  _tray.on('click', () => _window.show())
  _tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Exit',
        click: () => app.quit(),
      },
    ])

    _tray.popUpContextMenu(menuConfig) // originall Tray method
  })
  _tray.setToolTip('Majorkey 👌') // method in parent class
})

app.on('quit', () => {
  _window = null
  _tray = null
  console.log('quit called');

})
