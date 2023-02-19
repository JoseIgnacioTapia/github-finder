import { configureStore } from '@reduxjs/toolkit';
import githubUsersSlice from '../features/github/githubUsers';

export const store = configureStore({
  reducer: {
    githubApi: githubUsersSlice,
  },
});
