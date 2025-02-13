import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import todoListHandlers from './api/todoListHandlers.js';
import todoListValidators from './api/validators/todoListValidators.js';

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register([
        Inert,
        Vision,
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
            }
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
            }
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
                params: todoListValidators.paramsPatchTodos,
                payload: todoListValidators.payloadPatchTodos
            }
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
                params: todoListValidators.paramsDeleteTodos
            }
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
