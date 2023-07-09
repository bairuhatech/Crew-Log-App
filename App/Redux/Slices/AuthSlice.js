import {createSlice} from '@reduxjs/toolkit';
const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    user: {},
    admin: false,
    auth: false,
  },
  reducers: {
    login: (state, action) => {
      (state.user = action.payload), (state.auth = true), (state.guest = false);
    },
    logout: (state, action) => {
      (state.user = {}), (state.auth = false);
    },
    update: (state, action) => {
      state.user = {name: action.payload};
    },
  },
});

export default AuthSlice;
export const {login, logout, update} = AuthSlice.actions;
