import * as ui from './uiActions';
import {apiUrl} from '../config/config';
import Axios from '../config/axios';
import * as constants from './actionTypes';

export function successRequestingProjects(response){
  return { type: constants.SET_PROJECTS, projects: response.data};
}

export function successRequestingProject(response){
  if (!response.data) return;

  const {length} = response.data;
  
  if(length)
    return { type: constants.SET_PROJECT, project: response.data[0]};
  else 
    return { type: constants.SET_PROJECT, project: response.data};
}

export function removeProject(){
  return {type: constants.REMOVE_PROJECT}
}

export function requestAllProjects(){
  return function(dispatch) {
    dispatch(ui.loadingChanged(true));
    
    return Axios.get(`${apiUrl}/projects`).then(
      response => {
        dispatch(successRequestingProjects(response))
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

export function requestProject(slug) {
  return function(dispatch) {
    return Axios.get(`${apiUrl}/posts/${slug}`).then(
      response => dispatch(successRequestingProject(response))
    ).then(
    )
  }
}

