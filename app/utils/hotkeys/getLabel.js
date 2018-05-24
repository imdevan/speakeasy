import labels from './labels'

export default name => labels[name] ? labels[name] : <span>{name} 👌</span>
