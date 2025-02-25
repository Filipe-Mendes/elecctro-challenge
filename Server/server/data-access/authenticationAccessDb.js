import knexConnection from './dbConnection.js';

const readUser = async function (username) {

    try {
        const user = await knexConnection.select('username', 'email', 'name')
            .from('users')
            .where('username', username);
        if (user.length === 0) {
            return null;
        }

        return user[0];
    }
    catch (err) {
        console.log(err);
        return null;
    }
};

const checkUserPassword = async function (user, pass) {

    try {
        const res = await knexConnection.select('username')
            .from('users')
            .where({ username: user, password: pass });
        if (res.length === 0) {
            return false;
        }

        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

const createUser = async function (user) {

    try {
        const res = await knexConnection.insert(user).into('users');
        if (res.rowCount !== 1) {
            return false;
        }

        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

const editUser = async function (username, body) {

    try {
        const edited = await knexConnection('users')
            .update(body)
            .where('username', username);

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

export default {
    readUser,
    checkUserPassword,
    createUser,
    editUser
};
