import {SET_PAGE, SET_PAGES, REMOVE_PAGE} from '../actions/pageActions.js';

export default function pages(state = [], action){
  switch(action.type){
    case SET_PAGES:
      return Object.assign({}, state, {
        allPages: action.pages
      });

    case REMOVE_PAGE:
      return Object.assign({}, state,{
        currentPage: ""
      });

    case SET_PAGE:
      return Object.assign({}, state, {
        currentPage: action.page
      });

    default:
      return state;
  }
}
