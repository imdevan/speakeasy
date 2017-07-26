import { SET_USER, RESET_USER } from '../actions/user'

const initialState = {
  email: 'user@example.com'
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {...state, ...action.payload}
    case RESET_USER:
      return {...initialState}
    default:
      return state
  }
}
