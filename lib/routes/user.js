'use strict';

const Joi = require('joi')

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
          payload: Joi.object({
            firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user')
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
        tags: ['api'],
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        
        return await userService.getAll();
    }
  },
  {
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        const id = request.params.id

        return await userService.del(id);
    }
  },
  {
    method: 'patch',
    path: '/user/{id}',
    options: {
        tags: ['api']
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        const id = request.params.id
        const newData = request.payload
        console.log(newData)
        return await userService.update(id, newData);
    }
  }
];