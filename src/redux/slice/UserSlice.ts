import { createSlice } from '@reduxjs/toolkit';
import {
  deleteData,
  fetchData,
  insertData,
  updateData,
} from '../actions/userActions';

export interface Todo {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  returnPolicy: string;
}

interface todoState {
  items: Todo[];
  loading: boolean;
}

const initialState: todoState = { items: [], loading: false };

const UserSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(insertData.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateData.fulfilled, (state, action) => {
        const Index = state.items.findIndex(i => i.id === action.payload.id);
        if (Index !== -1) state.items[Index] = action.payload;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      });
  },
});

export default UserSlice.reducer;
