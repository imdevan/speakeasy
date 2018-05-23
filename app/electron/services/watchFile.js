
import storage from 'electron-json-storage'
import path from 'path'
import fs from 'fs'

import unhandled from 'electron-unhandled'
unhandled()

const getData = (name, callBack) => {
  storage.get(name, (error, data) => {
    if (error) throw error

    callBack(data)
  })
}

const watchFile = (name, callBack) => {
  const dataPath = path.join(storage.getDataPath(), `${name}.json`)

  // If file doesn't exist
  if (!fs.existsSync(dataPath)) {
    storage.set(name, {}, error => {
      if (error) throw error
    })
  } else {
    getData(name, callBack)
  }

  // Watch file for changes
  fs.watchFile(dataPath, (curr, prev) => {
    getData(name, callBack)
  })
}

export default watchFile
