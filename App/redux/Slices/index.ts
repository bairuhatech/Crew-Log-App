import {combineReducers} from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import UserSlice from './UserSlice';

const Slices = combineReducers({
  Auth: AuthSlice.reducer,
  User: UserSlice.reducer,
});
export default Slices;
