
import storage from 'electron-json-storage'
import path from 'path'
import fs from 'fs'

import unhandled from 'electron-unhandled'
unhandled();

const getData = callBack => {
  storage.getAll(function (error, data) {
    if (error) throw error;

    callBack(data)
  });
}

const init = (callBack) => {
  const dataPath = path.join(storage.getDataPath(), 'majorKeyHotkeys.json');

  // If file doesn't exist
  if (!fs.existsSync(dataPath)) {
    storage.set('majorKeyHotkeys', { value: 'default' }, error => {
      if (error) throw error;
    });
  } else {
    getData(callBack)
  }

  // Watch file for changes
  fs.watchFile(dataPath, (curr, prev) => {
    getData(callBack)
  });
}

export default {
  init
}
