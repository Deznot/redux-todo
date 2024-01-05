import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../components/todo/todoSlice';

const store = configureStore({
    reducer: { todos: todoReducer },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;