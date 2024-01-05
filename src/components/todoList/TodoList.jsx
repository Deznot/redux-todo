import { useSelector } from 'react-redux';
import './todoList.scss';

const TodoList = () => {
    const todos = useSelector(state => state.todos);

    const listItems = todos.map(el => {
        return <li key={el.id}>{el.title}</li>;
    });

    return (
        <ul>
            {listItems}
        </ul>
    );
}

export default TodoList;