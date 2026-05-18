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
      state.items.push(action.payload);
      // const tempNote = {
      //   ...action.payload,
      //   id: Date.now().toString(),
      //   isOffline: true,
      // };

      // state.offlineData.push(tempNote as Todo);
    },
    updateItem: (state, action) => {
      const Index = state.items.findIndex(i => i.id === action.payload.id);
      if (Index !== -1) state.items[Index] = action.payload;

      // if (!state.offlineData) return;
      // state.offlineData = state.offlineData.map(item =>
      //   item.id === action.payload.id
      //     ? { ...item, ...action.payload.data }
      //     : item,
      // );
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
