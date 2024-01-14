import { useSelector } from "react-redux";
import "./totalCompleteItems.scss";



const TotalCompleteItems = () => {
    const todos = useSelector(state => {
        if (state.todos.todosLoadingStatus === "loading") {
            return "loading";
        } else {
            return state.todos.todos.filter((todo) => todo.completed === true).length;
        }
    });
    
    return (
        <div>
        <h3>Total completed todos: {todos}</h3>
        </div>
    );
}

export default TotalCompleteItems;