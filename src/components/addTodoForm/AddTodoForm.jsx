import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodosAsync } from "../todo/todoSlice";

const AddTodoForm = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();


    const onSubmitHundler = (e) => {
        e.preventDefault();

        if (value) {
            dispatch(addTodosAsync({ title: value }));
        }

        setValue('');
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