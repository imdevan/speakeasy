import {SET_PROJECT, SET_PROJECTS, REMOVE_PROJECT} from '../actions/pageActions.js';

export default function pages(state = [], action){
  switch(action.type){
    case SET_PROJECTS:
      return Object.assign({}, state, {
        allPages: action.pages
      });

    case REMOVE_PROJECT:
      return Object.assign({}, state,{
        currentPage: ""
      });

    case SET_PROJECT:
      return Object.assign({}, state, {
        currentPage: action.page
      });

    default:
      return state;
  }
}
