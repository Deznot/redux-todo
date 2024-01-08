import { useDispatch, useSelector } from 'react-redux';
import './todoList.scss';
import TodoListItem from '../todoListItem/TodoListItem';
import { useEffect } from 'react';
import { getTodosAsync } from '../todo/todoSlice';

const TodoList = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch]);


    const onClick = (id) => {
        console.log(id);
    }

    const listItems = todos.map(({ id, ...props }) => {
        return <TodoListItem {...props} id={id} key={id} onClick={() => onClick(id)} />;
    });

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export default TodoList;