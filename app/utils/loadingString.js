import random from 'lodash/random'

const loadingStrings = [
  'Constructing addtional pylons...',
  'Making things pretty...',
  'Trying my best...'
]

export default () => {
  return loadingStrings[random(loadingStrings.length-1)]
}
