import * as constants from './actionTypes';
import * as ui from './uiActions';

import Axios from '../config/axios';
import {apiUrl} from '../config/config';

export function successRequestingSubscribers(response){
  return { type: constants.SUBSCRIBER_COUNT, subscribers: response.data.response};
}

export function successRequestingAddSubscriber(response){
  return { type: constants.ADD_SUBSCRIBER};
}

// THUNKS HERE
export function requestMailchimpSubscribers(){
  return function(dispatch){
    dispatch(ui.loadingChanged(true));

    let requestUrl = `${apiUrl}/subscribers`
    return Axios.get(requestUrl).then(
      response => dispatch(successRequestingSubscribers(response))
    ).then(
      response => dispatch(ui.loadingChanged(false))
    ).catch(
      error => dispatch(ui.displayError(error.response.data.response.detail)), dispatch(ui.loadingChanged(false))
    )
  }
}

export function requestAddMailchimpSubscriber(email, ref){
  return function(dispatch){
    dispatch(ui.loadingChanged(true));

    let requestUrl = `${apiUrl}/subscribers`;
    return Axios({
      method: 'post',
      url: requestUrl,
      data: {
        email: email,
        reference: ref
      }
    }).then(
      response => dispatch(successRequestingAddSubscriber(response))
    ).then(
      response => dispatch(ui.loadingChanged(false))
    ).catch(
      error => dispatch(ui.displayError(error.response.data.response.detail)), dispatch(ui.loadingChanged(false))
    );
  }
}
