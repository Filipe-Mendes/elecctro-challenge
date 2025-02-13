import knexConnection from './dbConnection.js';

const readTodo = async function (id) {

    try {
        const todoList = await knexConnection.select('*')
            .from('todo')
            .where('id', id);
        if (todoList.length === 0) {
            return null;
        }

        delete todoList[0].username;
        return todoList[0];
    }
    catch (err) {
        return null;
    }
};

const readTodos = async function (filter, orderBy) {

    try {

        const todoLists = await knexConnection.select('*')
            .from('todo')
            .whereIn('state', filter)
            .orderBy(orderBy);

        todoLists.forEach((todo) => delete todo.username);
        return todoLists;
    }
    catch (err) {
        return null;
    }
};

const createTodo = async function (todo) {

    try {
        const res = await knexConnection.insert(todo, 'id').into('todo');
        if (res === null) {
            return null;
        }

        return res[0].id;
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

        if (edited === 1) {
            return true;
        }

        return false;
    }
    catch (err) {
        return false;
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
        if (deleted === 1) {
            return true;
        }

        return false;
    }
    catch (err) {
        return false;
    }
};

export default {
    readTodo,
    readTodos,
    createTodo,
    editTodo,
    deleteTodo
};
