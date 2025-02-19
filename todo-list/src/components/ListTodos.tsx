import axios from 'axios'
import './App.css'
import { useEffect, useState } from 'react';
import { Todo } from '../model/Todo.tsx';
import STATE from '../model/state.tsx';
import ORDER from '../model/order.tsx';

export default function TodoList() {
    const [hidden, setHidden] = useState(false);
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');
    const [editDes, setEditDesc] = useState(false);
    const DEFAULT_ID = -1;
    const [editId, setEditId] = useState(DEFAULT_ID);
    const MAX_ORDERS = 3;
    const [order, setOrder] = useState(0);


    async function getTodos() {
        console.log("GET TODOS")
        try {
            let res = await axios.get(import.meta.env.VITE_API_ENDPOINT + '/todos')
            res = res.data.map((todo: Todo) => ({
                id: todo.id,
                state: todo.state,
                description: todo.description,
                createdAt: new Date(todo.createdAt),
                completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined

            }));
            setTodos(res)
        } catch (error) {
            alert('Failed to list todos');
        }
    }
    useEffect(() => {
        console.log("USE EFFECT")
        getTodos()
    }, [])

    async function deleteTodo(id: number) {
        console.log("DELETE TODO")
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/todo/${id}`)
            getTodos()
        } catch (error) {
            alert('Failed to delete todo');
        }
    }

    async function editTodo(id: number) {
        console.log("EDIT TODO")
        if (editId == DEFAULT_ID || id != editId) {
            setEditDesc(true)
            setEditId(id)
            setDescription('')
        } else {
            setEditDesc(false)
            setEditId(DEFAULT_ID)
            setDescription('')
        }
    }

    async function editDescriptionTodo(id: number) {
        console.log("EDIT TODO")
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_ENDPOINT}/todo/${id}`, {
                description: description
            })
            getTodos()
        } catch (error) {
            alert('Failed to edit todo');
        }
        editTodo(editId)
    }

    async function changeState(id: number, checked: STATE) {
        console.log("SET COMPLETE :" + checked)
        let state
        if (checked == STATE.COMPLETE) state = STATE.INCOMPLETE
        else if (checked == STATE.INCOMPLETE) state = STATE.COMPLETE

        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_ENDPOINT}/todo/${id}`, {
                state: state
            })
            getTodos()
        } catch (error) {
            alert('Failed to edit todo');
        }
    }

    function handleOrder() {
        if (order < MAX_ORDERS - 1) setOrder(order + 1)
        else setOrder(0)
        console.log(order)
    }

    function sortFuction(a: Todo, b: Todo) {
        switch (order) {
            case ORDER.DESCRIPTION_AZ:
                return a.description.localeCompare(b.description);
            case ORDER.DESCRIPTION_ZA:
                return b.description.localeCompare(a.description);
            default:
                return a.createdAt.getTime() - b.createdAt.getTime();
        }
    }

    return (
        <div>
            <h2>
                <span onClick={() => handleOrder()}>Tasks</span>
            </h2>
            {todos
                .filter((todo: Todo) => {
                    if (hidden) {
                        return todo.state !== STATE.COMPLETE;
                    } else {
                        return true;
                    }
                })
                .sort((a, b) => (sortFuction(a, b)))
                .map((todo: Todo) => {
                    console.log("map : " + todo.id)
                    return <div key={todo.id}>
                        <input type="checkbox" id={"complete" + todo.id} name="complete"
                            checked={todo.state == STATE.COMPLETE}
                            onChange={() => { changeState(todo.id, todo.state); }}
                        />

                        {todo.description}

                        <button onClick={() => { editTodo(todo.id); }} disabled={todo.state == STATE.COMPLETE ? true : false}>
                            Edit
                        </button>

                        <button onClick={() => { deleteTodo(todo.id); }}>
                            Delete
                        </button>

                        {(editDes && todo.id == editId) ?
                            <div>
                                <br />
                                <label htmlFor="todo"></label>
                                <input type="text"
                                    id="description"
                                    name="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    placeholder="New description"
                                    required />
                                <button onClick={() => { editDescriptionTodo(todo.id); }}>
                                    Change description
                                </button>
                            </div> : null}
                        <br />

                    </div>
                })
            }
            <br></br>
            <div>
                <input type="checkbox" id="hide" name="hide"
                    checked={hidden}
                    onClick={() => setHidden(!hidden)} />
                <label htmlFor="hide">Hide completed</label>
            </div>
        </div>

    );

}
