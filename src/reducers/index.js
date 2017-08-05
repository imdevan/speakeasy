import {combineReducers} from 'redux';
import categories from './categoryReducer';
import ui from './uiReducer';
import subscribers from './subscribersReducer';
import loading from './loadingReducer';
import posts from './postsReducer';
import pages from './pagesReducer';

const rootReducer = combineReducers({
  ui,
  categories,
  subscribers,
  posts,
  pages,
  loading
});

export default rootReducer;
