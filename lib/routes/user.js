'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                mail: Joi.string().email().required(),
                password: Joi.string().required().min(8)
            })
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.create(request.payload);
    }
},
{
    method: 'get',
    path: '/users',
    options: {
        auth : {
            scope: 'user'
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.getAll();
    }
},
{
    method: 'get',
    path: '/user/{id}',
    options: {
        auth : false,
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        const id = request.params.id;

        return await userService.getUser(id);
    }
},
{
    method: 'delete',
    path: '/user/{id}',
    options: {
        auth : {
            scope: [ 'admin' ]
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        const id = request.params.id;

        return await userService.del(id);
    }
},
{
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth : {
            scope: [ 'admin' ]
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        const id = request.params.id;
        const newData = request.payload;
        return await userService.update(id, newData);
    }
},
{
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        const login = request.payload;

        return await userService.login(login, h);
    }
}
];
