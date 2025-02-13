import Joi from 'joi';
import STATE from '../../state.js';
import ORDER from '../../order.js';

//TODO: CHECK EMPTY RESPONSES

//INPUT VALIDATORS
const idJoi = Joi.number().integer();
const stateJoi = Joi.string().valid(...Object.values(STATE));
const descriptionJoi = Joi.string().min(0).max(255);
//TODO: CHECK DATES FORMAT
const createdAtJoi = Joi.date().timestamp();
const completedAtJoi = Joi.date().timestamp();//CHECK IF NULL IS ALLOWED

const filterJoi = Joi.string().valid(...Object.keys(STATE));
const orderByJoi = Joi.string().valid(...Object.keys(ORDER));


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


//PATCH /TODOS/{id}
//PARAMS
const paramsPatchTodos = Joi.object({
    id: idJoi.required()
});

//PAYLOAD
const payloadPatchTodos = Joi.object({
    state: stateJoi,
    description: descriptionJoi
}).or('state', 'description');

//RESPONSE
const responsePatchTodos = Joi.object({
    id: idJoi.required(),
    state: stateJoi.required(),
    description: descriptionJoi.required(),
    createdAt: createdAtJoi.required(),
    completedAt: completedAtJoi.required()
});

//DELETE /TODOS/{id}
//PARAMS
const paramsDeleteTodos = Joi.object({
    id: idJoi.required()
});

export default {
    payloadPostTodos,
    responsePostTodos,
    queryGetTodos,
    responseGetTodos,
    paramsPatchTodos,
    payloadPatchTodos,
    responsePatchTodos,
    paramsDeleteTodos
};
