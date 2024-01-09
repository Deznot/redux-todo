import { useDispatch } from "react-redux";
import "./todoListItem.scss";
import { deleteTodosAsync, toggleCompleteAsync } from "../todo/todoSlice";
import { useState } from "react";

const TodoListItem = ({ id, title, completed, ...props }) => {
    const dispatch = useDispatch();
    const handleCheckboxClick = () => {
        dispatch(
            toggleCompleteAsync({ id, completed: !completed })
        )
    }

    const hundleDeleteClick = () => {
        dispatch(deleteTodosAsync({ id }));
    }

    return (
        <li className="list-item">
            <div>
                <span>
                    <input
                        type='checkbox'
                        className='mr-3'
                        onClick={handleCheckboxClick}
                        checked={completed}
                        readOnly
                    ></input>
                </span>
                {title}
                <button onClick={hundleDeleteClick} className='btn btn-danger'>Delete</button>
            </div>

        </li>
    );
};

export default TodoListItem;