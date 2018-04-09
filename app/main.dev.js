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
import { app, BrowserWindow, globalShortcut } from 'electron';
// import robotjs from 'robotjs'

// import MenuBuilder from './menu';
// import nodeAbi from 'node-abi';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */
// https://github.com/electron/electron/blob/master/docs/api/global-shortcut.md
// https://github.com/electron/electron/blob/master/docs/api/accelerator.md
// https://robotjs.io/docs/syntax
  app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
  // after all windows have been cl sed
  if (process.platform !== 'darwin') {

    // // Unregister a shortcut.
    // globalShortcut.unregister('CommandOrControl+X')

    // // Unregister all shortcuts.
    // globalShortcut.unregisterAll()

    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  // console.log('NODE ABI', nodeAbi.getAbi(process.version, 'node'));


  // const ret = globalShortcut.register('CommandOrControl+X', () => {
  //   console.log('CommandOrControl+X is pressed')
  //   robot.keyTap("X", "control");
  // })

  // if (!ret) {
  //   console.log('registration failed')
  // }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))

  mainWindow = new BrowserWindow({
    show: true,
    transparent: true,
    width: 1600,
    height: 900
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
});
