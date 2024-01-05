import { useSelector } from 'react-redux';
import './todoList.scss';
import TodoListItem from '../todoListItem/TodoListItem';

const TodoList = () => {
    const todos = useSelector(state => state.todos);

    const onClick = (id) => {
        console.log(id);
    }

    const listItems = todos.map(({ id, ...props }) => {
        return <TodoListItem {...props} key={id} onClick={() => onClick(id)} />;
    });

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export default TodoList;