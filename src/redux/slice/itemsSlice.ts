import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteData,
  fetchData,
  insertData,
  updateData,
} from '../actions/itemsAction';

export interface Todo {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  returnPolicy: string;
}

export interface todoState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  offlineData: Todo[];
}

const initialState: todoState = {
  items: [],
  status: 'idle',
  offlineData: [],
};

console.log('offlineData :>> ', initialState.offlineData);

const ItemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Todo>) => {
      console.log('Data Inserted');
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      // const { id, title } = action.payload;
      // const Item = state.items.find(i => i.id === id);
      // if (Item) Item.title = title;
      const Index = state.items.findIndex(i => i.id === action.payload.id);
      if (Index !== -1) state.items[Index] = action.payload;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchData.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, state => {
        state.status = 'failed';
      })

      .addCase(insertData.pending, state => {
        state.status = 'loading';
      })
      .addCase(insertData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(insertData.rejected, state => {
        state.status = 'failed';
      })

      .addCase(updateData.pending, state => {
        state.status = 'loading';
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const Index = state.items.findIndex(i => i.id === action.payload.id);
        if (Index !== -1) state.items[Index] = action.payload;
      })
      .addCase(updateData.rejected, state => {
        state.status = 'failed';
      })

      .addCase(deleteData.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(i => i.id !== action.payload.id);
      })
      .addCase(deleteData.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default ItemSlice.reducer;
export const { addItem, updateItem, deleteItem } = ItemSlice.actions;
