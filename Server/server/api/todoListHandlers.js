import db from '../data-access/accessDb.js';
import STATE from '../state.js';
import ORDER from '../order.js';

const getTodos = async function (request, reply) {

    let filter = request.query.filter;
    if (filter === undefined || STATE[filter] === STATE.ALL) {
        filter = Object.keys(STATE);
    }
    else {
        filter = [request.query.filter];
    }

    const orderBy = request.query.orderBy ? ORDER[request.query.orderBy] : ORDER.CREATED_AT;

    const res = await db.readTodos(filter, orderBy);
    res.forEach((todo) => delete todo.username);
    return res;
};

// id - attributed by the database
// state - default value
// description - received from user
// createdAt - attributed when user requests
// completedAt - null
const postTodo = async function (request, reply) {

    const todo = request.payload;
    todo.state = STATE.INCOMPLETE;
    todo.createdAt = new Date().toISOString();
    const res = await db.createTodo(todo);
    return res;
};

const patchTodo = async function (request, reply) {

    //CHECK IF ITS INCOMPLETE FIRST
    const id = request.params.id;
    const todoList = await db.readTodo(id);

    if (todoList === null) {
        //ID DOESN'T EXIST, RETURN 404
        return null;
    }

    if (todoList.state !== STATE.INCOMPLETE) {
        //TODO LIST CANNOT BE CHANGED, RETURN 400
        return null;
    }

    const body = request.payload;
    const edited = await db.editTodo(id, body);
    //CHECK IF EDITED IS AN ERROR
    const res = await db.readTodo(id);
    return res;
};

const deleteTodo = async function (request, reply) {

    //CHECK IF IT EXISTS FIRST
    const id = request.params.id;

    const todoList = await db.readTodo(id);
    if (todoList === null) {
        //ID DOESN'T EXIST, RETURN 404
        return null;
    }

    const res = await db.deleteTodo(id);
    //if res = 1 deleted
    //if res = 0 404
    //RETURN EMPTY RESPONSE
    return {};
};

export default {
    getTodos,
    postTodo,
    patchTodo,
    deleteTodo
};
