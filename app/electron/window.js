import { BrowserWindow, Menu } from 'electron'

import unhandled from 'electron-unhandled'
unhandled()

import project from './config/project'

class Window extends BrowserWindow {
  constructor(url) {
    super(project.windowOptions)
    this.loadURL(url)

    // if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    //   this.installExtensions.bind(this)
    // }
    // this.on('blur', this.onBlur.bind(this))
    // this.on('closed', this.onClose.bind(this))
    // Setup menu, you should change this
    // Menu.setApplicationMenu(null)
  }

  installExtensions() {
    const installer = require('electron-devtools-installer')
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ]

    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log)
  }

  // onClose() {
  //   this = null
  // }

  // onBlur() {
  //   this.hide()
  // }
}

export default Window
