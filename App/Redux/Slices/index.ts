import {combineReducers} from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import CheckSlice from './CheckInOut';
const Slices = combineReducers({
  Auth: AuthSlice.reducer,
  CheckInOut: CheckSlice.reducer,
});
export default Slices;
