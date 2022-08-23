import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import queryReducer from './querySlice';
import appointmentReducer from './appointmentSlice';
import { serviceCategoriesReducer } from './reducers/categories';
import authReducer from './authSlice';
import userReducer from './userSlice';

import filter from './filter/slice';

export const store = configureStore({
  reducer: {
    query: queryReducer,
    appointment: appointmentReducer,
    serviceCategories: serviceCategoriesReducer,
    user: userReducer,
    auth: authReducer,
    filter,
  },
  // middleware: thunk,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
