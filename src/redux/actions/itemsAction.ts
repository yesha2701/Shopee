import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { OfflineData, Todo } from '../slice/itemsSlice';
import { RootState } from '../store';

const Api_Url = 'https://69f335c6bd2396bf530f915a.mockapi.io/crud';

export const fetchData = createAsyncThunk('items/fetch', async () => {
  const response = await axios.get(Api_Url);
  return response.data;
});

export const insertData = createAsyncThunk(
  'items/post',
  async (itemData: Todo) => {
    const response = await axios.post(Api_Url, itemData);
    return response.data;
  },
);

export const updateData = createAsyncThunk(
  'items/put',
  async ({ id, data }: { id: string; data: Partial<Todo> }) => {
    const response = await axios.put(`${Api_Url}/${id}`, data);
    return response.data;
  },
);

export const deleteData = createAsyncThunk(
  'items/delete',
  async (id: string) => {
    await axios.delete(`${Api_Url}/${id}`);
    return { id };
  },
);

let syncInProgress = false;

export const syncOfflineData = createAsyncThunk(
  'items/syncOffline',
  async (_, { getState, dispatch }) => {
    if (syncInProgress) {
      return;
    }

    const state = getState() as RootState;
    const queue = [...state.itemSlice.offlineData];

    if (queue.length === 0) {
      return;
    }

    syncInProgress = true;
    try {
      for (const items of queue) {
        await offlineQueue(items);
      }
      await dispatch(fetchData());
    } finally {
      syncInProgress = false;
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return (
        state.itemSlice.offlineData.length > 0 && !state.itemSlice.isSyncing
      );
    },
  },
);

const offlineQueue = async (items: OfflineData) => {
  switch (items.type) {
    case 'insert':
      await axios.post(Api_Url, items.payload);
      break;
    case 'update':
      await axios.put(`${Api_Url}/${items.payload.id}`, items.payload.data);
      break;
    case 'delete':
      await axios.delete(`${Api_Url}/${items.payload}`);
      break;
  }
};
