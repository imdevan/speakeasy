import store from '../store/store';
const getWidth = () => {
  var w = window,
      d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

  return width;
}

export function xs() {
  if(getWidth() >= 0)
    return true
}
export function sm() {
  if(getWidth() >= 576)
    return true
}
export function md() {
  if(getWidth() >= 768)
    return true
}
export function lg() {
  if(getWidth() >= 992)
    return true
}
export function xlg() {
  if(getWidth() >= 1200)
    return true
}
