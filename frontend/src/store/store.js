import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/api/authApi';
import authReducer from '../features/authSlice'
import { userApi } from '../features/api/userApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
});
