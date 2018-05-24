import electronStorage from 'electron-json-storage'
import { LOCAL_STORE } from '../electron/config/project'

// Load / Save to browser storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORE)

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    console.error('ERROR LOADING STATE:', err)
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)

    localStorage.setItem(LOCAL_STORE, serializedState)
    saveForElectron(state)
  } catch (err) {
    console.error('ERROR SAVING STATE:', err)
  }
}

// Load / Save to electron storage
export const loadFromElectronState = () => {
  return new Promise((resolve, reject) => {
    storage.get(LOCAL_STORE, (error, data) => {
      if (error)
        reject(error, data)
      else if (data === null)
        resolve(undefined)
      else
        resolve(data)
    })
  })
}

const saveForElectron = data => {
  electronStorage.set(
    LOCAL_STORE,
    data,
    error => { if (error) throw error }
  )
}

// Possible reference
// https://codeburst.io/how-to-store-user-data-in-electron-3ba6bf66bc1e
