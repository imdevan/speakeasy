import storage from 'electron-json-storage'
import { localStore } from '../electron/config/project'

// Load / Save to browser storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStore.name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("ERROR LOADING STATE: ", err);
    return undefined;
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStore.name, serializedState);
  } catch (err) {
    console.log("ERROR SAVING STATE: ", err);
  }
}

// Load / Save to electron storage
export const loadFromElectronState = () => {
  return new Promise((resolve, reject) => {
    storage.get(localStore.name, (error, data) => {
      if (error)
        reject(error, data)
      else if (data === null)
        resolve(undefined)
      else
        resolve(data)
    })
  })
}

const saveForElectron = state => {
  localStorage.set(
    localStore.name,
    state,
    error => { if (error) throw error }
  )
}

// Possible reference
// https://codeburst.io/how-to-store-user-data-in-electron-3ba6bf66bc1e
