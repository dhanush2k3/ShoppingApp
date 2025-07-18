import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../reducers/productSlice';
import cartReducer from '../reducers/cartSlice';
import wishlistReducer from '../reducers/wishlistSlice';
import profileReducer from '../reducers/profileSlice';
import ordersReducer from '../reducers/orderSlice';
export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
