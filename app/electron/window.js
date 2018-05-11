import { BrowserWindow, Menu } from 'electron';
import robotjs from 'robotjs'

import unhandled from 'electron-unhandled'
unhandled();

import project from './config/project';
import events from './services/events'
import watchFile from './services/watchFile'

let window = null;

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

const initElectronWindow = async appUrl => {
  window = new BrowserWindow(project.windowOptions);
  window.loadURL(appUrl);

  window.webContents.on('did-finish-load', () => {
    if (!window) {
      throw new Error('"window" is not defined');
    }

    window.show();
    window.focus();
  });

  window.on('closed', () => { window = null });

  // Setup menu, you should change this
  Menu.setApplicationMenu(null)
}

const init = async appUrl => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  // The secret sauce
  watchFile.init(events.register);

  // Electron window mgmt
  initElectronWindow(appUrl)
}

export default {
  init
}
