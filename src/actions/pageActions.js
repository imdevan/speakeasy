import * as constants from './actionTypes';
import * as ui from './uiActions';
import {apiUrl} from '../config/config';
import Axios from '../config/axios';

export function successRequestingPages(response){
  return { type: constants.SET_PAGES, pages: response.data};
}

export function successRequestingPage(response){
  if (!response.data) return;

  const {length} = response.data;
  
  if(length)
    return { type: constants.SET_PAGE, page: response.data[0]};
  else 
    return { type: constants.SET_PAGE, page: response.data};
}

export function removePage(){
  return {type: constants.REMOVE_PAGE}
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
        console.log(e)
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

