import Jwt from '@hapi/jwt';
import db from '../../data-access/authenticationAccessDb.js';
import HTTP_STATUS_CODE from '../httpStatusCodes.js';

const tokenBlacklist = new Set();

const postLogin = async function (request, reply) {

    const username = request.payload.username;
    const password = request.payload.password;

    const valid = await db.checkUserPassword(username, password);
    if (!valid) {
        return reply.response('Invalid credentials').code(HTTP_STATUS_CODE.UNAUTHORIZED);
    }

    const generatedToken = generateToken(username);
    return reply.response({ token: generatedToken }).code(HTTP_STATUS_CODE.OK);
};

const generateToken = function (username) {

    return Jwt.token.generate(
        {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            user: username,
            group: 'hapi_community'

        },
        {
            key: process.env.HAPI_JWT_KEYS,
            algorithm: 'HS512'
        },
        {
            ttlSec: Number(process.env.TOKEN_EXPIRE_TIME)
        }
    );
};


const postLogout = function (request, reply) {

    const token = request.auth.artifacts.token;

    if (tokenBlacklist.has(token)) {
        return reply.response('User already logged out').code(HTTP_STATUS_CODE.UNAUTHORIZED);
    }

    tokenBlacklist.add(token);
    return reply.response({ message: 'Logout successful' }).code(HTTP_STATUS_CODE.OK);
};

const postUsers = async function (request, reply) {

    const created = await db.createUser(request.payload);
    //TODO: CHANGE PASSWORD TO PASSWORD HASH
    if (!created) {
        return reply.response({ error: 'Error creating user' }).code(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    const generatedToken = generateToken(request.payload.username);
    return reply.response({ token: generatedToken }).code(HTTP_STATUS_CODE.CREATED);

};

const getUser = async function (request, reply) {

    const user = request.auth.credentials.user;
    const res = await db.readUser(user);
    if (res === null) {
        return reply.response('Error retrieving user data').code(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    return reply.response(res).code(HTTP_STATUS_CODE.OK);
};

const patchUser = async function (request, reply) {

    const username = request.auth.credentials.user;
    const body = request.payload;
    //TODO: CHECK IF PASSWORD IS TO BE CHANGED

    const edited = await db.editUser(username, body);

    if (edited === false) {
        return reply.response({ error: 'Error editing user' }).code(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR);
    }

    const res = await db.readUser(username);
    return reply.response(res).code(HTTP_STATUS_CODE.OK);
};


export default {
    postLogin,
    postLogout,
    postUsers,
    getUser,
    patchUser
};
