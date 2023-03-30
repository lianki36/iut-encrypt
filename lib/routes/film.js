'use strict';

const Joi = require('joi').extend(require('@joi/date'));

module.exports = [{
    method: 'post',
    path: '/film',
    options: {
        auth: {
            scope: 'admin'
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().required(),
                releaseDate: Joi.date().format('DD-MM-YYYY'),
                director: Joi.string().required()
            })
        }
    },
    handler: async (request, h) => {
        const { filmService } = request.services();

        return await filmService.create(request.payload);
    }
},
{
    method: 'get',
    path: '/films',
    options: {
        auth : false,
        tags: ['api']
    },
    handler: async (request, h) => {
        const { filmService } = request.services();

        return await filmService.getAll();
    }
},
{
    method: 'get',
    path: '/film/{id}',
    options: {
        auth : false,
        tags: ['api']
    },
    handler: async (request, h) => {
        const { filmService } = request.services();

        const id = request.params.id;

        return await filmService.getFilm(id);
    }
},
{
    method: 'delete',
    path: '/film/{id}',
    options: {
        auth : {
            scope: 'admin'
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { filmService } = request.services();

        const id = request.params.id;

        return await filmService.del(id);
    }
},
{
    method: 'patch',
    path: '/film/{id}',
    options: {
        auth : {
            scope: 'admin'
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { filmService } = request.services();

        const id = request.params.id;
        const newData = request.payload;
        return await filmService.update(id, newData);
    }
},
{
    method: 'post',
    path: '/film/{id}/like',
    options: {
        auth : {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { filmService } = request.services();

        const idFilm = request.params.id;
        const idUser = request.auth.credentials.id
        return await filmService.like(idFilm, idUser);
    }
},
{
    method: 'delete',
    path: '/film/{id}/like',
    options: {
        auth : {
            scope: ['user', 'admin']
        },
        tags: ['api']
    },
    handler: async (request, h) => {
        const { filmService } = request.services();

        const idFilm = request.params.id;
        const idUser = request.auth.credentials.id
        return await filmService.unlike(idFilm, idUser);
    }
}
];
