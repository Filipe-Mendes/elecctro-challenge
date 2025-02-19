import './App.css'
import TodoForm from './components/CreateTodo';
import TodoList from './components/ListTodos';

function App() {

	return (
		<>
			<h1>To-do list</h1>
			<TodoForm />
			<br></br>
			<TodoList />

		</>
	)
}

export default App
