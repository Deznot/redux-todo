import { useDispatch } from "react-redux";
import "./todoListItem.scss";
import { toggleComplete } from "../todo/todoSlice";

const TodoListItem = (props) => {
    const dispatch = useDispatch();
    const handleCheckboxClick = () => {
        dispatch(
            toggleComplete({ id: props.id, completed: !props.completed })
        )
    }

    return (
        <li className="list-item" onClick={props.onClick}>
            <input
                type='checkbox'
                className='mr-3'
                onClick={handleCheckboxClick}
            // checked={props.completed}
            ></input>
            {props.title}
            <button className='btn btn-danger'>Delete</button>
        </li>
    );
};

export default TodoListItem;