import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ItemReducer from './slice/itemsSlice';
import UserReducer from './slice/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
  itemSlice: ItemReducer,
  userSlice: UserReducer,
});
const persistConfig = { key: 'root', storage: AsyncStorage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useMyAppSelector = useSelector.withTypes<RootState>();
