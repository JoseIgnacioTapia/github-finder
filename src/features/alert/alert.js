import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const alertMessageSlice = createSlice({
  name: 'alertMessage',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    clearAlert: () => null,
  },
});

export const { setAlert, clearAlert } = alertMessageSlice.actions;

export default alertMessageSlice.reducer;
