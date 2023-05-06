import { combineReducers } from "redux";
import auth from './auth';
import posts from './posts';
import handleState from './handleState';

export default combineReducers({
    posts,
    auth,
    handleState,
})