import "./todoListItem.scss";

const TodoListItem = (props) => {
    return (
        <li className="list-item" onClick={props.onClick}>{props.title}</li>
    );
};

export default TodoListItem;