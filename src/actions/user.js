const SET_USER = 'SET_USER';
const RESET_USER = 'RESET_USER';

export function set(payload){
  return {
    type: SET
  , payload
  }
}

export function reset(){
  return {
    type: RESET
  }
}
