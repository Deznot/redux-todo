// import { useDispatch, useSelector } from 'react-redux';
import './todoList.scss';
import TodoListItem from '../todoListItem/TodoListItem';
// import { useEffect } from 'react';
// import { getTodosAsync,toggleCompleteAsync } from '../todo/todoSlice';
import Spinner from "../spinner/Spinner";
import { useGetTodosQuery, useToggleCompleteTodoMutation} from '../api/apiSlice';

const TodoList = () => {
    // const todos = useSelector(state => state.todos.todos);
    // const todosLoadingStatus = useSelector(state => state.todos.todosLoadingStatus);
    // const dispatch = useDispatch();

    const {
        data: todos = [],
        isLoading,
        isSuccess,
        isError,
        error,
        isFetching
    } = useGetTodosQuery();

    const [toggleCompleteTodo] = useToggleCompleteTodoMutation();

    // useEffect(() => {
    //     dispatch(getTodosAsync())
    // }, [dispatch]);


    const onClick = async (id,completed) => {
        try {
            await toggleCompleteTodo({id, completed: !completed}).unwrap();
        } catch (err) {
            console.error('Failed to toggle todo: ', err)
        }
        // dispatch(
        //     toggleCompleteAsync({ id, completed: !completed })
        // )
    }

    // if (todosLoadingStatus === "loading") {
    //     return <Spinner />;
    // } else if (todosLoadingStatus === "error") {
    //     return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    // }

     // const listItems = todos.map(({ id, ...props }) => {
    //     return <TodoListItem {...props} id={id} key={id} onClick={() => onClick(id, props.completed)} />;
    // });

    let content;

    if (isLoading) {
        content = <Spinner />;
      } else if (isSuccess) {
        content = todos.map(({ id, ...props }) => {
            return <TodoListItem {...props} id={id} key={id} onClick={() => onClick(id, props.completed)} />;
        });
      } else if (isError) {
        content = <h5 className="text-center mt-5">Ошибка загрузки</h5>
      }

    return (
        <ul>
            {content}
        </ul>
    );
}

export default TodoList;