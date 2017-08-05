import * as ui from './uiActions';
import {apiUrl} from '../config/config';
import Axios from '../config/axios';

export const SET_PAGES = 'SET_PAGES';
export const SET_PAGE = 'SET_PAGE';
export const REMOVE_PAGE = 'REMOVE_PAGE';

export function successRequestingPages(response){
  return { type: SET_PAGES, pages: response.data};
}

export function successRequestingPage(response){
  if (!response.data) return;

  debugger
  const {length} = response.data;
  
  if(length)
    return { type: SET_PAGE, page: response.data[0]};
  else 
    return { type: SET_PAGE, page: response.data};
}

export function removePage(){
  return {type: REMOVE_PAGE}
}

export function requestAllPages(){
  return function(dispatch) {
    dispatch(ui.loadingChanged(true));
    
    return Axios.get(`${apiUrl}/pages`).then(
      response => {
        dispatch(successRequestingPages(response))
      }
    ).then(
      response => dispatch(ui.loadingChanged(false))
    ).catch(e => {
      // redirect here
        dispatch(ui.displayError(e.response.data.response.detail))
        dispatch(ui.loadingChanged(false))
      }
    )
  }
}

export function requestPage(slug) {
  return function(dispatch) {
    return Axios.get(`${apiUrl}/pages/${slug}`).then(
      response => dispatch(successRequestingPage(response))
    ).then(
    )
  }
}

