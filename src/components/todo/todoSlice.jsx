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

const initialState = [
    // { id: 1, title: 'todo1', completed: false },
    // { id: 2, title: 'todo2', completed: false },
    // { id: 3, title: 'todo3', completed: true },
    // { id: 4, title: 'todo4', completed: false },
    // { id: 5, title: 'todo5', completed: false },
];

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

            state.push(todo);
        },
        toggleComplete: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action) => {
            return state.filter((el) => el.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                return state = action.payload.todos;
            })
            .addCase(getTodosAsync.pending, state => {

            })
            .addCase(getTodosAsync.rejected, (state, action) => {

            })
            .addDefaultCase(() => { })
    }

});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer; 