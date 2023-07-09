import {createSlice} from '@reduxjs/toolkit';
const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    user: {},
    guest: false,
    auth: false,
    checkin: false,
    checkout: false,
  },
  reducers: {
    login: (state: any, action: any) => {
      (state.user = action.payload), (state.auth = true), (state.guest = false);
    },
    logout: (state: any) => {
      (state.user = {}), (state.auth = false);
    },
    update: (state: any, action: any) => {
      state.user = {name: action.payload};
    },

    checkin: (state: any) => {
      (state.checkin = true), (state.checkout = false);
    },

    checkout: (state: any) => {
      (state.checkout = true), (state.checkin = false);
    },
    guest: (state: any, action: any) => {
      state.guest = true;
    },
  },
});

export default AuthSlice;
export const {login, logout, update, checkin, checkout, guest} =
  AuthSlice.actions;
