
import { configureStore, history } from './configureStore'
import { createFirestoreConnect } from 'react-redux-firebase'
import throttle from 'lodash/throttle'

import { loadState, saveState } from './localStorage'
import defaultState from './defaultState'

const store = configureStore(loadState() || defaultState)

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 1000)
)

export default {
  store, history
}
