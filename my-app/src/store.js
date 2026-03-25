import { configureStore } from '@reduxjs/toolkit';
import pollReducer from './pollSlice836';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    polls_836: pollReducer,
    auth: authReducer
  }
});
