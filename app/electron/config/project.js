import path from 'path'

export default {
  windowOptions: {
    show: false, // Will be set to true on 'ready'
    minWidth: 900,
    minHeight: 900,
    frame: true,
    autoHideMenuBar: false, // useful if you want a menu that is hidden only sometimes
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '../../ok-emoji.png'),
    webPreferences: {
      devTools: process.env.NODE_ENV === 'development',
      scrollBounce: true
    }
  },
  localStore: {
    name: 'majorKeyStore'
  }
}
