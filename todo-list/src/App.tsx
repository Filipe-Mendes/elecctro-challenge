import { createContext, useState } from 'react';
import './App.css'
import TodoForm from './components/CreateTodo';
import TodoList from './components/ListTodos';
import { TodoContext, TodoContextType } from './Context';
import { Todo } from './model/Todo';

function App() {

	const [todo, setTodo] = useState<Todo[]>([]);
	const ctx: TodoContextType = {
		todo: todo,
		setTodo: setTodo
	}

	return (
		<>
			<h1>To-do list</h1>
			<TodoContext.Provider value={ctx}>
				<TodoForm />
				<br></br>
				<TodoList />
			</TodoContext.Provider>

		</>
	)
}

export default App
