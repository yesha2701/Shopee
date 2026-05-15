import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Todo } from '../slice/itemsSlice';

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
  async ({ id, data }: { id: string; data: any }) => {
    const response = await axios.put(`${Api_Url}/${id}`, data);
    return response.data;
  },
);

export const deleteData = createAsyncThunk('items/delete', async (id: any) => {
  await axios.delete(`${Api_Url}/${id}`);
  return id;
});
