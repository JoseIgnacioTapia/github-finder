import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;

const initialState = {
  users: [],
  user: {},
  repos: [],
  loading: false,
};

// Get users
export const getGithubUsersItems = createAsyncThunk(
  'github/getUsersItems',
  async thunkAPI => {
    try {
      const resp = await axios(`${GITHUB_URL}/users`);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

// Get search results
export const getGithubUsersSearch = createAsyncThunk(
  'github/getUsersSearch',
  async (user, thunkAPI) => {
    try {
      const params = new URLSearchParams({
        q: user,
      });

      const response = await axios.get(`${GITHUB_URL}/search/users?${params}`);

      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

// Get user & repos
export const getUserAndRepos = createAsyncThunk(
  'github/getUserAndRepos',
  async (login, thunkAPI) => {
    try {
      const [user, repos] = await Promise.all([
        axios.get(`${GITHUB_URL}/users/${login}`),
        axios.get(`${GITHUB_URL}/users/${login}/repos`),
      ]);

      return { user: user.data, repos: repos.data };
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);

const githubUsersSlice = createSlice({
  name: 'githubUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getGithubUsersItems.pending, state => {
        state.loading = true;
      })
      .addCase(getGithubUsersItems.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getGithubUsersItems.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getGithubUsersSearch.pending, state => {
        state.loading = true;
      })
      .addCase(getGithubUsersSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getGithubUsersSearch.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserAndRepos.pending, state => {
        state.loading = true;
      })
      .addCase(getUserAndRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.repos = action.payload.repos;
      })
      .addCase(getUserAndRepos.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export default githubUsersSlice.reducer;
