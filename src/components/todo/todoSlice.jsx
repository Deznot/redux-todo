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

export const addTodosAsync = createAsyncThunk(
    'todos/addTodosAsync',
    async (payload) => {
        const { request } = useHttp();
        const todo = {
            id: nanoid(),
            title: payload.title,
            completed: false,
        };

        const todos = await request("http://localhost:3001/todos", "POST", JSON.stringify(todo));

        return { todos };
    }
);

export const deleteTodosAsync = createAsyncThunk(
    'todos/deleteTodosAsync',
    async (payload) => {
        const { request } = useHttp();
        await request(`http://localhost:3001/todos/${payload.id}`, "DELETE");
        return { id: payload.id };
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
        toggleComplete: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            state.todos[index].completed = action.payload.completed;
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
            .addCase(addTodosAsync.pending, state => {
                state.todosLoadingStatus = 'loading'
            })
            .addCase(addTodosAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    todosLoadingStatus: 'idle',
                    todos: [...state.todos, action.payload.todos],
                }
            })
            .addCase(addTodosAsync.rejected, (state, action) => {
                state.todosLoadingStatus = 'error'
            })
            .addCase(deleteTodosAsync.pending, state => {
                state.todosLoadingStatus = 'loading'
            })
            .addCase(deleteTodosAsync.fulfilled, (state, action) => {
                return {
                    ...state,
                    todosLoadingStatus: 'idle',
                    todos: state.todos.filter(el => el.id !== action.payload.id),
                }
            })
            .addCase(deleteTodosAsync.rejected, (state, action) => {
                state.todosLoadingStatus = 'error'
            })
            .addDefaultCase(() => { })
    }

});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer; 