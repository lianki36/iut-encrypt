'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Like extends Model {

    static get tableName() {

        return 'like';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            idUser: Joi.number().integer().greater(0),
            idFilm: Joi.number().integer().greater(0),

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
