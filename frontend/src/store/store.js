import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/api/authApi';
import authReducer from '../features/authSlice'
import cartReducer from '../features/cartSlice'
import { userApi } from '../features/api/userApi';
import { productApi } from '../features/api/productApi';
import { categoryApi } from '../features/api/categoryApi';
import { cloudApi } from '../features/api/cloudApi';
import { brandApi } from '../features/api/barndsApi';
import { cartApi } from '../features/api/cartApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [cloudApi.reducerPath]: cloudApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(cloudApi.middleware)
      .concat(brandApi.middleware)
      .concat(cartApi.middleware)
});
