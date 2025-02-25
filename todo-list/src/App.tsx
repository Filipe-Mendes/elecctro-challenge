import { useEffect, useState } from 'react';
import './App.css'
import TodoForm from './components/CreateTodo';
import TodoList from './components/ListTodos';
import { TodoContext, TodoContextType } from './TodoContext';
import { Todo } from './model/Todo';
import Header from './components/Header';
import { AuthContext } from './AuthContext';
import Authentication from './components/Authentication';
import Logout from './components/Logout';

function App() {

	const [todo, setTodo] = useState<Todo[]>([]);
	const ctx: TodoContextType = {
		todo: todo,
		setTodo: setTodo
	}

	const [token, setToken] = useState('');
	const authCtx = {
		token: token,
		setToken: setToken
	}

	useEffect(() => {
        console.log("USE EFFECT APP")
	}, [authCtx.token])

	return (
		<>
			<Header />
			<AuthContext.Provider value={authCtx}>
				{(!authCtx.token) ?
					<div>
						<Authentication />
					</div>
					:
					<div>
						<Logout />
						<h1>To-do list</h1>
						<TodoContext.Provider value={ctx}>
							<TodoForm />
							<br></br>
							<TodoList />
						</TodoContext.Provider>
					</div>
				}


			</AuthContext.Provider>

		</>
	)
}

export default App
