import {createSlice} from '@reduxjs/toolkit';
const UserSlice = createSlice({
  name: 'User',
  initialState: {
    emp_id: '',
  },
  reducers: {
    empId: (state: any, action: any) => {
      state.emp_id = action.payload;
    },
  },
});

export default UserSlice;
export const {empId} = UserSlice.actions;
