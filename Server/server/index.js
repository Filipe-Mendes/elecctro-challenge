import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Jwt from '@hapi/jwt';
import HapiSwagger from 'hapi-swagger';
import todoListHandlers from './api/handlers/todoListHandlers.js';
import todoListValidators from './api/validators/todoListValidators.js';
import authenticationHandlers from './api/handlers/authenticationHandlers.js';


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type', 'Authorization'],
                credentials: true
            }
        }
    });

    await server.register([
        Inert,
        Vision,
        Jwt,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: 'Test API Documentation',
                    version: '1.0.0'
                },
                documentationPath: '/docs'
            }
        }
    ]);

    server.auth.strategy('jwt_auth', 'jwt', {
        keys: process.env.HAPI_JWT_KEYS,
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: process.env.TOKEN_EXPIRE_TIME,
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {

            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user }
            };
        }
    });

    // AUTHENTICATION ENDPOINTS
    server.route({
        method: 'POST',
        path: '/login',
        handler: authenticationHandlers.postLogin,
        options: {
            description: 'Authenticate user',
            notes: 'Receives the username and password of a user and authenticates them',
            tags: ['api']
        }
    });

    server.route({
        method: 'POST',
        path: '/logout',
        handler: authenticationHandlers.postLogout,
        options: {
            description: 'Logs out a user',
            notes: 'Invalidates the credentials of the authenticated user',
            tags: ['api'],
            auth: 'jwt_auth'
        }
    });

    server.route({
        method: 'POST',
        path: '/users',
        handler: authenticationHandlers.postUsers,
        options: {
            description: 'Creates a new account',
            notes: 'This route should receive the user details and create a new account',
            tags: ['api']
        }
    });

    server.route({
        method: 'GET',
        path: '/me',
        handler: authenticationHandlers.getUser,
        options: {
            description: 'Get user information',
            notes: 'Returns the details of the authenticated user',
            tags: ['api'],
            auth: 'jwt_auth'
        }
    });

    server.route({
        method: 'PATCH',
        path: '/me',
        handler: authenticationHandlers.patchUser,
        options: {
            description: 'Edits user information',
            notes: 'This route edits the details of the authenticated user.',
            tags: ['api'],
            auth: 'jwt_auth'
        }
    });

    server.route({
        method: 'GET',
        path: '/todos',
        handler: todoListHandlers.getTodos,
        options: {
            description: 'Get to-do lists',
            notes: 'Lists the to-do lists considering the conditions imposed on the query parameters',
            tags: ['api'],
            validate: {
                query: todoListValidators.queryGetTodos
            },
            response: {
                schema: todoListValidators.responseGetTodos,
                failAction: 'error'
            },
            auth: 'jwt_auth'
        }
    });

    server.route({
        method: 'POST',
        path: '/todos',
        handler: todoListHandlers.postTodo,
        options: {
            description: 'Create to-do list',
            notes: 'Creates a to-do list with the provided description',
            tags: ['api'],
            validate: {
                payload: todoListValidators.payloadPostTodos
            },
            response: {
                schema: todoListValidators.responsePostTodos,
                failAction: 'error'
            },
            auth: 'jwt_auth'
        }
    });

    server.route({
        method: 'PATCH',
        path: '/todo/{id}',
        handler: todoListHandlers.patchTodo,
        options: {
            description: 'Edit to-do list',
            notes: 'Edits to-do list, changing the provided fields',
            tags: ['api'],
            validate: {
                params: todoListValidators.paramsPatchTodo,
                payload: todoListValidators.payloadPatchTodo
            },
            response: {
                schema: todoListValidators.responsePatchTodos,
                failAction: 'error'
            },
            auth: 'jwt_auth'
        }
    });

    server.route({
        method: 'DELETE',
        path: '/todo/{id}',
        handler: todoListHandlers.deleteTodo,
        options: {
            description: 'Delete to-do list',
            notes: 'Deletes to-do list with the specified id',
            tags: ['api'],
            validate: {
                params: todoListValidators.paramsDeleteTodo
            },
            response: {
                schema: todoListValidators.responseDeleteTodo,
                failAction: 'error'
            },
            auth: 'jwt_auth'
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
