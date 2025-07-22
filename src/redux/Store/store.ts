import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/productSlice';
import cartReducer from '../reducers/cartSlice';
import wishlistReducer from '../reducers/wishlistSlice';
import profileReducer from '../reducers/profileSlice';
import ordersReducer from '../reducers/orderSlice';
import authReducer from '../reducers/authSlice';
import { authApi } from '../reducers/authApi';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
    orders: ordersReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
