import { combineReducers } from '@reduxjs/toolkit';
import githubUsersSlice from '../features/github/githubUsers';
import alertMessageSlice from '../features/alert/alert';

const rootReducer = combineReducers({
  githubApi: githubUsersSlice,
  alert: alertMessageSlice,
});

export default rootReducer;
