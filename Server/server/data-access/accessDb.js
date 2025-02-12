import knexConnection from './dbConnection.js';

const readTodo = async function (id) {

    try {
        const todoList = await knexConnection.select('*')
            .from('todo')
            .where('id', id);
        return todoList;
    }
    catch (err) {
        return null;
    }
};

const readTodos = async function (filter, orderBy) {

    try {
        const todoLists = await knexConnection.select('*')
            .from('todo')
            .where(filter)
            .orderBy(orderBy);
        return todoLists;
    }
    catch (err) {
        return null;
    }
};

const createTodo = async function (todo) {

    try {
        const res = await knexConnection.insert(todo, ['id']).into('todo');
        return res;
    }
    catch (err) {
        return null;
    }
};

const editTodo = async function (id, body) {

    try {
        const edited = await knexConnection('todo')
            .update(body)
            .where('id', id);
        return edited;
    }
    catch (err) {
        return null;
    }
};

//RETURNS NUMBER OF ROWS DELETED
// 1 - DELETED
// 0 - NONE
const deleteTodo = async function (id) {

    try {
        const deleted = await knexConnection.from('todo')
            .where('id', id)
            .del();
        return deleted;
    }
    catch (err) {
        return null;
    }
};

export default {
    readTodo,
    readTodos,
    createTodo,
    editTodo,
    deleteTodo
};
