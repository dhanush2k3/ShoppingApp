import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'Wishlist',
  initialState,
  reducers: {
    addToWhishlist(state, action: PayloadAction<WishlistItem>) {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWhishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToWhishlist, removeFromWhishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
