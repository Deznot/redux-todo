import { useState } from "react";
import { useDispatch } from "react-redux";
// import { addTodosAsync } from "../todo/todoSlice";
import { useAddTodoMutation } from "../api/apiSlice";
import { nanoid } from '@reduxjs/toolkit';

const AddTodoForm = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const [addTodo, {isLoading}] = useAddTodoMutation();

    const onSubmitHundler = async (e) => {
        e.preventDefault();

        // if (value) {
        //     dispatch(addTodosAsync({ title: value }));
        // }

        const todo = {
            id: nanoid(),
            title: value,
            completed: false,
        };

        try {
            await addTodo(todo).unwrap();
            setValue('');
        } catch (err) {
            console.error('Failed to save the todo: ', err)
        }
    }

    return (
        <form onSubmit={onSubmitHundler}>
            <input
                type='text'
                className='form-input'
                placeholder='Add todo...'
                value={value}
                onChange={(event) => setValue(event.target.value)}
            ></input>

            <input type="submit" />
        </form>
    );
}

export default AddTodoForm;