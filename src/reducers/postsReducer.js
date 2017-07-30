import * as types from '../actions/actionTypes';

export default function posts(state = [], action){
  switch(action.type){

    case types.ADD_POSTS:
      return Object.assign({}, state, {
        allPosts: action.posts
      });

    case types.REMOVE_POST:
      return Object.assign({}, state,{
        currentPost: ""
      });

    case types.ADD_POST:
      return Object.assign({}, state, {
        currentPost: action.post
      });

    default:
      return state;
  }
}
