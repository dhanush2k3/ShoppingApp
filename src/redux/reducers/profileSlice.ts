import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  name: string;
  email: string;
  avatar: string | null;
}

const initialState: ProfileState = {
  name: '',
  email: '',
  avatar: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile(
      state,
      action: PayloadAction<{ name: string; email: string }>,
    ) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    updateAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
  },
});

export const { updateProfile, updateAvatar } = profileSlice.actions;
export default profileSlice.reducer;
