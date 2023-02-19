import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;

const initialState = {
  users: [],
  user: {},
  repos: [],
  loading: false,
};

export const getGithubUsersItems = createAsyncThunk(
  'github/getUsersItems',
  async thunkAPI => {
    try {
      const resp = await axios(GITHUB_URL);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
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
        console.log(action.payload);
        state.users = action.payload;
      })
      .addCase(getGithubUsersItems.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default githubUsersSlice.reducer;
