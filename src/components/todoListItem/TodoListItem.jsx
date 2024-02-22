// import { useDispatch } from "react-redux";
import "./todoListItem.scss";
// import { deleteTodosAsync, toggleCompleteAsync } from "../todo/todoSlice";
import { useDeleteTodoMutation, useToggleCompleteTodoMutation } from '../api/apiSlice';

const TodoListItem = ({ id, title, completed, ...props }) => {
    // const dispatch = useDispatch();
    const [deleteTodo, {isLoading}] = useDeleteTodoMutation();
    const [toggleCompleteTodo] = useToggleCompleteTodoMutation();
    const handleCheckboxClick = async () => {
        try {
            await toggleCompleteTodo({id, completed: !completed}).unwrap();
        } catch (err) {
            console.error('Failed to toggle todo: ', err)
        }
        // dispatch(
        //     toggleCompleteAsync({ id, completed: !completed })
        // )
    }

    const hundleDeleteClick = async (e) => {
        e.stopPropagation();
        try {
            await deleteTodo(id).unwrap();
        } catch (err) {
            console.error('Failed to delete todos: ', err)
        }
        // dispatch(deleteTodosAsync({ id }));
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