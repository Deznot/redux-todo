import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../components/todo/todoSlice';
import { apiSlice } from '../components/api/apiSlice';

const store = configureStore({
    reducer: { 
        todos: todoReducer,
        [apiSlice.reducerPath]: apiSlice.reducer 
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;