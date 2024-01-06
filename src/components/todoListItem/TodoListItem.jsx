import { useDispatch } from "react-redux";
import "./todoListItem.scss";
import { toggleComplete } from "../todo/todoSlice";

const TodoListItem = ({id,title,completed, ...props}) => {
    const dispatch = useDispatch();
    const handleCheckboxClick = () => {
        dispatch(
            toggleComplete({ id, completed: !completed })
        )
    }

    return (
        <li className="list-item" onClick={props.onClick}>
            <div>
                <input
                    type='checkbox'
                    className='mr-3'
                    onClick={handleCheckboxClick}
                    checked={completed}
                    readOnly
                ></input>
                {title}
                <button className='btn btn-danger'>Delete</button>
            </div>
            
        </li>
    );
};

export default TodoListItem;