import { combineReducers } from "redux";
import auth from './auth';
import tweets from './tweets';

export default combineReducers({
  auth,
  tweets
});
