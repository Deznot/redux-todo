import './app.scss';
import AddTodoForm from '../addTodoForm/AddTodoForm';
import TodoList from '../todoList/TodoList';
import TotalCompleteItems from '../totalCompleteItems/TotalCompleteItems';

const App = () => {
    return (
        <main>
            <TotalCompleteItems/>
            <div className="content">
                <AddTodoForm />
                <TodoList />
            </div>
        </main>
    );
}

export default App;