import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface userData {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface userState {
  users: userData[];
}

const initialState: userState = {
  users: [],
};

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    registerData: (state, action: PayloadAction<userData>) => {
      state.users.push(action.payload);
    },
  },
});

export const { registerData } = UserSlice.actions;
export default UserSlice.reducer;
