
import storage from 'electron-json-storage'
import fs from 'fs'

import unhandled from 'electron-unhandled'
unhandled();

const init = (callBack) => {
  const dataPath = storage.getDataPath();

  fs.watchFile(`${dataPath}/majorKey.json`, (curr, prev) => {
    storage.getAll(function (error, data) {
      if (error) throw error;

      callBack(data)
    });
  });
}

export default {
  init
}
