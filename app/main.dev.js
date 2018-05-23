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
import storage from 'electron-json-storage'
import path from 'path'
import fs from 'fs'
import unhandled from 'electron-unhandled'
unhandled()

import watchFile from './electron/services/watchFile'
import events from './electron/services/events'
import { windowOptions, LOCAL_STORE } from './electron/config/project'

// Production overhead
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

// Development overhead
if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

// Local variables
let _window
let _tray
let force_quit = false

// Manage Tray
const initTray = () => {
  _tray = new Tray(path.join(__dirname, 'ok-emoji.png'), _window)

  _tray.on('click', () => {
    _window.show()
    _window.focus()
  })

  _tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([{
      label: 'Exit',
      click: () => {
        force_quit = true
        app.quit()
      }
    }])

    _tray.popUpContextMenu(menuConfig) // originall Tray method
  })
  _tray.setToolTip('Majorkey 👌') // method in parent class
}

// Manage Window
const initWindow = () => {
  // init window
  _window = new BrowserWindow(windowOptions)
  _window.loadURL(`file://${__dirname}/app.html`)

  // Emitted when the window is closed.
  _window.on('close', (event) => {
    if (!force_quit)
      event.preventDefault()

    _window.hide();
  })

  // First load
  storage.get(LOCAL_STORE, store => {
    console.log('LOCAL_STORE', LOCAL_STORE);
    console.log('store', store);

    if (!store || !store.setUpComplete) {
      _window.show()
      _window.focus()

      if (process.env.NODE_ENV === 'development') {
        _window.webContents.openDevTools()
      }
    }
  })

  Menu.setApplicationMenu(null)
}

app.on('ready', async () => {
  if (process.platform === 'darwin') {
    app.dock.hide() // hide app from dock on Mac OS
  }

  watchFile(LOCAL_STORE, events.register)
  initWindow()
  initTray()
})

app.on('quit', () => {
  _window = null
  _tray = null
  events.unRegisterAll()
})
