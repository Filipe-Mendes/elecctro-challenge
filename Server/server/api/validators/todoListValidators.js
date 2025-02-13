import Joi from 'joi';
import STATE from '../../state.js';
import ORDER from '../../order.js';

//INPUT VALIDATORS
const idJoi = Joi.number().integer();
const stateJoi = Joi.string().valid(...Object.values(STATE));
const descriptionJoi = Joi.string().min(0).max(255);
const createdAtJoi = Joi.date().iso();
const completedAtJoi = Joi.alternatives().try(
    Joi.date().iso().required(),
    Joi.valid(null).required()
);
const filterJoi = Joi.string().valid(...Object.keys(STATE));
const orderByJoi = Joi.string().valid(...Object.keys(ORDER));

const emptyJoi = Joi.object({});

//POST /TODOS
//PAYLOAD
const payloadPostTodos = Joi.object({
    description: descriptionJoi.required()
});

//RESPONSE
const responsePostTodos = Joi.object({
    id: idJoi.required(),
    state: stateJoi.required(),
    description: descriptionJoi.required(),
    createdAt: createdAtJoi.required(),
    completedAt: completedAtJoi.required()
});


//GET /TODOS
//QUERY
const queryGetTodos = Joi.object({
    filter: filterJoi,
    orderBy: orderByJoi
});

//PAYLOAD
const responseGetTodos = Joi.array().items(
    Joi.object({
        id: idJoi.required(),
        state: stateJoi.required(),
        description: descriptionJoi.required(),
        createdAt: createdAtJoi.required(),
        completedAt: completedAtJoi.required()
    })
);


//PATCH /TODO/{id}
//PARAMS
const paramsPatchTodos = Joi.object({
    id: idJoi.required()
});

//PAYLOAD
const payloadPatchTodo = Joi.object({
    state: stateJoi,
    description: descriptionJoi
}).or('state', 'description');

//RESPONSE
const responsePatchTodo = Joi.object({
    id: idJoi.required(),
    state: stateJoi.required(),
    description: descriptionJoi.required(),
    createdAt: createdAtJoi.required(),
    completedAt: completedAtJoi.required()
});

//DELETE /TODO/{id}
//PARAMS
const paramsDeleteTodo = Joi.object({
    id: idJoi.required()
});

//RESPONSE
const responseDeleteTodo = emptyJoi;

export default {
    payloadPostTodos,
    responsePostTodos,
    queryGetTodos,
    responseGetTodos,
    paramsPatchTodos,
    payloadPatchTodo,
    responsePatchTodo,
    paramsDeleteTodo,
    responseDeleteTodo
};
