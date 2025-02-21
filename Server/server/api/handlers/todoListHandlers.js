import db from '../../data-access/accessDb.js';
import STATE from '../../state.js';
import ORDER from '../../order.js';
import HTTP_STATUS_CODE from '../httpStatusCodes.js';

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
    return reply.response(res).code(HTTP_STATUS_CODE.OK);
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
    const id = await db.createTodo(todo);

    if (id === null) {
        reply.response({ error: 'Error creating to-do list' }).code(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    const res = await db.readTodo(id);
    return reply.response(res).code(HTTP_STATUS_CODE.CREATED);
};

const patchTodo = async function (request, reply) {

    const id = request.params.id;
    const todoList = await db.readTodo(id);

    if (todoList === null) {
        return reply.response({ error: 'This to-do list does not exist' }).code(HTTP_STATUS_CODE.NOT_FOUND);
    }

    const body = request.payload;
    if (todoList.state === STATE.COMPLETE && body.description !== null && body.description !== undefined) {
        return reply.response({ error: 'To-do list is not INCOMPLETE, description cannot be changed' }).code(HTTP_STATUS_CODE.BAD_REQUEST);
    }

    if (body.state) {
        if (body.state === STATE.COMPLETE) {
            body.completedAt = new Date().toISOString();
        }
        else if (body.state === STATE.INCOMPLETE) {
            body.completedAt = null;
        }
    }

    const edited = await db.editTodo(id, body);
    if (edited === false) {
        reply.response({ error: 'Error editing to-do list' }).code(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    const res = await db.readTodo(id);
    return reply.response(res).code(HTTP_STATUS_CODE.OK);
};

const deleteTodo = async function (request, reply) {

    const id = request.params.id;

    const todoList = await db.readTodo(id);
    if (todoList === null) {
        return reply.response({ error: 'This to-do list does not exist' }).code(HTTP_STATUS_CODE.NOT_FOUND);
    }

    const deleted = await db.deleteTodo(id);
    if (deleted === false) {
        reply.response({ error: 'Error deleting to-do list' }).code(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return reply.response({}).code(HTTP_STATUS_CODE.OK);
};

export default {
    getTodos,
    postTodo,
    patchTodo,
    deleteTodo
};
