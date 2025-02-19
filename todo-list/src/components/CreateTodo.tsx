import { useState } from 'react'
import axios from 'axios'
import './App.css'

export default function TodoForm() {
    const [description, setDescription] = useState('');


    async function createTodo(event) {
        event.preventDefault();
        console.log("Form submitted!");
        //check if description empty
        try {
            const res = await axios.post(import.meta.env.VITE_API_ENDPOINT + '/todos', {
                description: description
            })
            // alert('Todo created!');
            setDescription('')
        } catch (error) {
            alert('Failed to create todo');
        }
    }

    return (
        <div>
            <form onSubmit={createTodo}>
                <label htmlFor="todo"></label>
                <input type="text"
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Write new task here..."
                    required />
                <input type="submit" value="Create" />
            </form>
            <br />
        </div>
    );
}
