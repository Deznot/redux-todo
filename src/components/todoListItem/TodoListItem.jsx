import { useDispatch } from "react-redux";
import "./todoListItem.scss";
import { toggleComplete, deleteTodo } from "../todo/todoSlice";
import { deleteTodosAsync } from "../todo/todoSlice";

const TodoListItem = ({ id, title, completed, ...props }) => {
    const dispatch = useDispatch();
    const handleCheckboxClick = () => {
        dispatch(
            toggleComplete({ id, completed: !completed })
        )
    }

    const hundleDeleteClick = () => {
        dispatch(deleteTodosAsync({ id }));
    }

    return (
        <li className="list-item">
            <div>
                <input
                    type='checkbox'
                    className='mr-3'
                    onClick={handleCheckboxClick}
                    checked={completed}
                    readOnly
                ></input>
                {title}
                <button onClick={hundleDeleteClick} className='btn btn-danger'>Delete</button>
            </div>

        </li>
    );
};

export default TodoListItem;