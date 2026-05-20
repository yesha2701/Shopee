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
  isOffline?: boolean;
}

export type OfflineData =
  | { type: 'insert'; payload: Todo }
  | { type: 'update'; payload: { id: string; data: Partial<Todo> } }
  | { type: 'delete'; payload: string };

export interface todoState {
  items: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  offlineData: OfflineData[];
  isSyncing: boolean;
}

const initialState: todoState = {
  items: [],
  status: 'idle',
  offlineData: [],
  isSyncing: false,
};

const ItemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearOfflineQueue: state => {
      state.offlineData = [];
    },
    addItem: (state, action: PayloadAction<Todo>) => {
      const id = String(action.payload.id);
      const item: Todo = { ...action.payload, isOffline: true };

      const itemIndex = state.items.findIndex(i => String(i.id) === id);
      if (itemIndex !== -1) {
        state.items[itemIndex] = item;
      } else {
        state.items.push(item);
      }

      const queueIndex = state.offlineData.findIndex(
        items =>
          items.type === 'insert' && String((items.payload as Todo).id) === id,
      );
      if (queueIndex !== -1) {
        state.offlineData[queueIndex] = {
          type: 'insert',
          payload: action.payload,
        };
      } else {
        state.offlineData.push({ type: 'insert', payload: action.payload });
      }
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Todo> }>,
    ) => {
      const id = String(action.payload.id);
      const index = state.items.findIndex(i => String(i.id) === id);
      const currentItem = index !== -1 ? state.items[index] : undefined;

      if (currentItem) {
        state.items[index] = {
          ...currentItem,
          ...action.payload.data,
          isOffline: true,
        };
      }

      const pendingInsertIndex = state.offlineData.findIndex(
        items =>
          items.type === 'insert' && String((items.payload as Todo).id) === id,
      );

      if (pendingInsertIndex !== -1) {
        const insertPayload = state.offlineData[pendingInsertIndex]
          .payload as Todo;
        state.offlineData[pendingInsertIndex] = {
          type: 'insert',
          payload: { ...insertPayload, ...action.payload.data },
        };
        return;
      }

      if (currentItem?.isOffline) {
        state.offlineData.push({
          type: 'insert',
          payload: { ...currentItem, ...action.payload.data },
        });
        return;
      }

      state.offlineData = state.offlineData.filter(
        items => !(items.type === 'update' && String(items.payload.id) === id),
      );
      state.offlineData.push({
        type: 'update',
        payload: { id, data: action.payload.data },
      });
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      const id = String(action.payload);
      const item = state.items.find(i => String(i.id) === id);

      state.items = state.items.filter(i => String(i.id) !== id);
      state.offlineData = state.offlineData.filter(items => {
        if (
          items.type === 'insert' &&
          String((items.payload as Todo).id) === id
        ) {
          return false;
        }
        if (items.type === 'update' && String(items.payload.id) === id) {
          return false;
        }
        return true;
      });

      if (item && !item.isOffline) {
        state.offlineData.push({ type: 'delete', payload: id });
      }
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
      })

      .addMatcher(
        action => action.type === 'items/syncOffline/pending',
        state => {
          state.isSyncing = true;
        },
      )
      .addMatcher(
        action => action.type === 'items/syncOffline/fulfilled',
        state => {
          state.isSyncing = false;
          state.offlineData = [];
        },
      )
      .addMatcher(
        action => action.type === 'items/syncOffline/rejected',
        state => {
          state.isSyncing = false;
        },
      );
  },
});

export default ItemSlice.reducer;
export const { addItem, updateItem, deleteItem, clearOfflineQueue } =
  ItemSlice.actions;
