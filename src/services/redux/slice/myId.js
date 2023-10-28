import {createSlice} from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  myId: null,
};

export const userSlice = createSlice({
  name: 'myId',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.myId = action.payload;
    },
  },
});

export const {setId} = userSlice.actions;

export default userSlice.reducer;
