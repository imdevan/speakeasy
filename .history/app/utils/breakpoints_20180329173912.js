import store from '../store/store';

export function xs() {
  if(store.getState().ui.width >= 0)
    return true
}
export function sm() {
  if(store.getState().ui.width >= 576)
    return true
}
export function md() {
  if(store.getState().ui.width >= 768)
    return true
}
export function lg() {
  if(store.getState().ui.width >= 992)
    return true
}
export function xlg() {
  if(store.getState().ui.width >= 1200)
    return true
}
