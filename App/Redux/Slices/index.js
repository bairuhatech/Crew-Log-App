import {combineReducers} from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
const Slices = combineReducers({
  Auth: AuthSlice.reducer,
});
export default Slices;
