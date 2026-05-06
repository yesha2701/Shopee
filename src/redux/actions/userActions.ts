import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Api_Url = 'https://dummyjson.com/products?limit=10';

export const fetchData = createAsyncThunk('items/fetch', async () => {
  const response = await axios.get(Api_Url);
  return response.data.products;
});

export const insertData = createAsyncThunk('items/post', async itemData => {
  const response = await axios.post(Api_Url, itemData);
  return response.data.products;
});

export const updateData = createAsyncThunk(
  'items/put',
  async ({ id, title }) => {
    const response = await axios.put(`${Api_Url}/${id}`, { title });
    return response.data.products;
  },
);

export const deleteData = createAsyncThunk('items/delete', async id => {
  await axios.delete(`${Api_Url}/${id}`);
  return id;
});
