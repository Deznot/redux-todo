import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';
import { useHttp } from "../../hooks/hooks.http";

export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const { request } = useHttp();
        const todos = await request("http://localhost:3001/todos");
        return { todos };
    }
);

const initialState = {
    todosLoadingStatus: 'idle',
    todos: []
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload.title,
                completed: false,
            };
            return { ...state, todos: [...state.todos, todo] }
        },
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            state.todos[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return { ...state, todos: [...state.todos.filter((el) => el.id !== action.payload.id)] }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsync.pending, state => {
                state.todosLoadingStatus = 'loading'
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    todos: [...action.payload.todos],
                    todosLoadingStatus: 'idle'
                }
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.todosLoadingStatus = 'error'
            })
            .addDefaultCase(() => { })
    }

});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer; 