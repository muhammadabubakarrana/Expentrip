import {configureStore} from '@reduxjs/toolkit';
import user from './slice/user';
import myId from './slice/myId';
import expenseId from './slice/expenseId';

export const store = configureStore({
  reducer: {
    user,
    myId,
    expenseId,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
