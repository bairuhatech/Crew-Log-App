import {createSlice} from '@reduxjs/toolkit';
const CheckSlice = createSlice({
  name: 'CheckInOut',
  initialState: {
    state: {},
    status: false,
  },
  reducers: {
    CheckiN: (state: any, action: any) => {
      (state.state = action.payload), (state.status = true);
    },
    checkOUT: (state, action) => {
      (state.state = action.payload), (state.status = false);
    },
    Clearlog: (state, action) => {
      (state.state = {}), (state.status = false);
    },
  },
});

export default CheckSlice;
export const {CheckiN, checkOUT, Clearlog} = CheckSlice.actions;
