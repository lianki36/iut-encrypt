'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {

    static get tableName() {

        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            title: Joi.string().min(3).example('John').description('Firstname of the user'),
            description: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            releaseDate: Joi.date(),
            director: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }
};
