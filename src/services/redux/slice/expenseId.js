import {createSlice} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  expenseId: null,
};

export const userSlice = createSlice({
  name: 'expenseId',
  initialState,
  reducers: {
    setExpenseId: (state, action) => {
      state.expenseId = action.payload;
    },
  },
});

export const {setExpenseId} = userSlice.actions;

export default userSlice.reducer;
