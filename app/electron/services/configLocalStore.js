/**
 * Filler file
 * 
 * Configs local majorKeyStore.json
 */
import path from 'path'
import storage from 'electron-json-storage'
import fs from 'fs'
import DEFAULT_STORE from '../config/defaultStore'
import events from './events';

const accessStore = fileName => {
  // return new Promise((resolve, reject) => {
  //   // If file doesn't exist
  //   if (!fs.existsSync(fileName)) {
  //     resolve()
  //   }

  //   // If the store does exist
  //   storage.get(fileName, store => {
  //     if (store && store.setUpComplete) {
  //       resolve(store, store.setUpComplete);
  //     }
  //     else {
  //       reject(Error("No store"), store);
  //     }
  //   })
  // });
}

const initializeStore = fileName => {
  // return new Promise((resolve, reject) => {
  //   storage.set(fileName, DEFAULT_STORE, error => {
  //     if(error)
  //       reject(error);
  //     else
  //       resolve(DEFAULT_STORE);
  //   })
  // })
}

const watchFile = fileName => {
  // fs.watchFile(fileName, (curr, prev) => {
  //   accessStore(fileName).then(store => {
  //     if (store && store.hotkeyProfiles && store.activeProfile) {
  //       const { hotkeyProfiles, activeProfile } = store;

  //       events.register(hotkeyProfiles[activeProfile])
  //     }
  //   })
  // })
}

const configureStore = async name => {
  return null
  // storage.clear(error => console.log(error ? 'error' : 'no error!', error ? error : '')
  
  // try {
  //   const fileName = path.join(storage.getDataPath(), name, '.json')

  //   let store = await accessStore(fileName);

  //   if (!store || !store.hotkeyProfiles)
  //     store = await initializeStore(fileName);

  //   if (store && store.hotkeyProfiles)
  //     watchFile(fileName)
      
  //   return store;
  // } catch (err) {
  //   console.log(err);
  //   return null;
  // }
}

export default configureStore