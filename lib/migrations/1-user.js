'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {
            table.string('username');
            table.string('password');
            table.string('mail');
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
