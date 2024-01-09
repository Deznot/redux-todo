import './app.scss';
import AddTodoForm from '../addTodoForm/AddTodoForm';
import TodoList from '../todoList/TodoList';

const App = () => {
    return (
        <main>
            <div className="content">
                <AddTodoForm />
                <TodoList />
            </div>
        </main>
    );
}

export default App;