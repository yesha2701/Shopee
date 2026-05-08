import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Api_Url = 'https://69f335c6bd2396bf530f915a.mockapi.io/crud';

export const fetchData = createAsyncThunk('items/fetch', async () => {
  const response = await axios.get(Api_Url);
  return response.data;
});

export const insertData = createAsyncThunk('items/post', async itemData => {
  const response = await axios.post(Api_Url, itemData);
  return response.data;
});

export const updateData = createAsyncThunk(
  'items/put',
  async ({ id, title }: any) => {
    const response = await axios.put(`${Api_Url}/${id}`, { title });
    return response.data;
  },
);

export const deleteData = createAsyncThunk('items/delete', async id => {
  await axios.delete(`${Api_Url}/${id}`);
  return id;
});
