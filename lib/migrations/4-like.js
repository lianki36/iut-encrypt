'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('like', (table) => {

            table.increments('id').primary();
            table.integer('idUser').notNull().unsigned().references('id').inTable('user');
            table.integer('idFilm').notNull().unsigned().references('id').inTable('film');
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('like');
    }
};
