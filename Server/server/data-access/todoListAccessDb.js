import knexConnection from './dbConnection.js';

const readTodo = async function (tid, usern) {

    try {
        const todoList = await knexConnection.select('id', 'state', 'description', 'createdAt', 'completedAt')
            .from('todo')
            .where({ id: tid, username: usern });
        if (todoList.length === 0) {
            return null;
        }

        return todoList[0];
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

const readTodos = async function (filter, orderBy, username) {

    try {

        const todoLists = await knexConnection.select('id','state', 'description', 'createdAt', 'completedAt')
            .from('todo')
            .where('username', username)
            .whereIn('state', filter)
            .orderBy(orderBy);

        return todoLists;
    }
    catch (err) {
        console.log(err);
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
        console.log(err);
        return null;
    }
};

const editTodo = async function (tid, body, usern) {

    try {
        const edited = await knexConnection('todo')
            .update(body)
            .where({ id: tid, username: usern });

        if (edited === 1) {
            return true;
        }

        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

//RETURNS NUMBER OF ROWS DELETED
// 1 - DELETED
// 0 - NONE
const deleteTodo = async function (tid, user) {

    try {
        const deleted = await knexConnection.from('todo')
            .where({ id: tid, username: user })
            .del();
        if (deleted === 1) {
            return true;
        }

        return false;
    }
    catch (err) {
        console.log(err);
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
