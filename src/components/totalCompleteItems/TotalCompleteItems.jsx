import { useSelector } from "react-redux";
import "./totalCompleteItems.scss";
import {useGetTodosQuery} from '../api/apiSlice';


const TotalCompleteItems = () => {
    const {
        data: todos = [],
        isLoading,
        isSuccess,
        isError,
        error,
        isFetching
    } = useGetTodosQuery();

    // const todos = useSelector(state => {
    //     if (state.todos.todosLoadingStatus === "loading") {
    //         return "loading";
    //     } else {
    //         return state.todos.todos.filter((todo) => todo.completed === true).length;
    //     }
    // });
    
    const totalCount = useSelector(() => {
        return todos.filter((todo) => todo.completed === true).length;
    });
   
    return (
        <div>
            {/* {todos} */}
        <h3>Total completed todos: {totalCount}</h3>
        </div>
    );
}

export default TotalCompleteItems;