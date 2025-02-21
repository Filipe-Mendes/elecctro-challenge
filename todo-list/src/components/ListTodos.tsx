import axios from 'axios'
import '../App.css'
import { useContext, useEffect, useState } from 'react';
import { Todo } from '../model/Todo.tsx';
import STATE from '../model/state.tsx';
import ORDER from '../model/order.tsx';
import { TodoContext } from '../Context.tsx';

export default function TodoList() {
    const [hidden, setHidden] = useState(false);
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');

    const DEFAULT_ID = -1;
    const [editDes, setEditDesc] = useState(false);
    const [editId, setEditId] = useState(DEFAULT_ID);

    const MAX_ORDERS = 3;
    const [order, setOrder] = useState(0);
    const orderValues = Object.values(ORDER);

    const { todo, setTodo } = useContext(TodoContext);


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

    function updateFromLocalStorage() {
        const h = localStorage.getItem("hidden")
        const hv = h ? h === "true" : false
        setHidden(hv)

        const o = localStorage.getItem("order")
        setOrder(o ? parseInt(o) : 0);


    }
    useEffect(() => {
        console.log("USE EFFECT")
        getTodos()
        updateFromLocalStorage()
    }, [])

    useEffect(() => {
        console.log("USE EFFECT POST CREATED")
        getTodos()
    }, [todo])

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
        let newOrder
        if (order < MAX_ORDERS - 1) newOrder = order + 1
        else newOrder = 0

        setOrder(newOrder)
        localStorage.setItem("order", newOrder.toString())

    }

    function sortFuction(a: Todo, b: Todo) {
        console.log("sort: " + order)
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
            <p>({orderValues[order]})</p>
            {todos
                .filter((todo: Todo) => { return hidden ? todo.state !== STATE.COMPLETE : true }) // Shows all or only incomplete tasks according to hidden's value 
                .sort((a, b) => (sortFuction(a, b))) // Sorts tasks according to order value
                .map((todo: Todo) => {
                    console.log("map : " + todo.id)
                    return <div key={todo.id}>

                        <label className="container">
                            <input type="checkbox" id={"complete" + todo.id} name="complete"
                                checked={todo.state == STATE.COMPLETE}
                                onChange={() => { changeState(todo.id, todo.state); }}
                            />
                            <span className="checkmark"></span>
                        </label>


                        {todo.description}

                        <button onClick={() => { editTodo(todo.id); }} disabled={todo.state == STATE.COMPLETE ? true : false} className='button-edit'>
                            Edit
                        </button>

                        <button onClick={() => { deleteTodo(todo.id); }} className='button-delete'>
                            Delete
                        </button>

                        {(editDes && todo.id == editId && todo.state != STATE.COMPLETE) ?
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
                                <button className='button-action' onClick={() => { editDescriptionTodo(todo.id); }}>
                                    Confirm
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
                    onChange={() => {
                        setHidden(!hidden)
                        localStorage.setItem("hidden", "" + !hidden);
                    }} />
                <label htmlFor="hide">Hide completed</label>
            </div>
        </div>

    );

}
