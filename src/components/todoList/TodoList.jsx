import { useDispatch, useSelector } from 'react-redux';
import './todoList.scss';
import TodoListItem from '../todoListItem/TodoListItem';
import { useEffect } from 'react';
import { getTodosAsync,toggleCompleteAsync } from '../todo/todoSlice';
import Spinner from "../spinner/Spinner";

const TodoList = () => {
    const todos = useSelector(state => state.todos.todos);
    const todosLoadingStatus = useSelector(state => state.todos.todosLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch]);


    const onClick = (id,completed) => {
        dispatch(
            toggleCompleteAsync({ id, completed: !completed })
        )
    }

    if (todosLoadingStatus === "loading") {
        return <Spinner />;
    } else if (todosLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const listItems = todos.map(({ id, ...props }) => {
        return <TodoListItem {...props} id={id} key={id} onClick={() => onClick(id, props.completed)} />;
    });

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export default TodoList;