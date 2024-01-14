import { useDispatch } from "react-redux";
import "./todoListItem.scss";
import { deleteTodosAsync, toggleCompleteAsync } from "../todo/todoSlice";

const TodoListItem = ({ id, title, completed, ...props }) => {
    const dispatch = useDispatch();
    const handleCheckboxClick = () => {
        dispatch(
            toggleCompleteAsync({ id, completed: !completed })
        )
    }

    const hundleDeleteClick = (e) => {
        e.stopPropagation();
        dispatch(deleteTodosAsync({ id }));
    }

    return (
        <li className="list-item" completed={`${completed}`} onClick={(e) => props.onClick(id, completed)}>
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
                <button onClick={(e) => hundleDeleteClick(e)} className='btn btn-danger'>Delete</button>
            </div>

        </li>
    );
};

export default TodoListItem;