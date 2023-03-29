'use strict';

const { Service } = require('@hapipal/schmervice');
const crypto = require('crypto');

module.exports = class UserService extends Service {

    create(user) {
        const { User } = this.server.models();

        user.password = crypto.createHash('sha1').update(user.password).digest('hex');
        return User.query().insertAndFetch(user);
    }

    getAll() {
        const { User } = this.server.models();

        return User.query();
    }

    async del(id) {
        const { User } = this.server.models();

        const nbDeleted = await User.query().deleteById(id);

        if (nbDeleted > 0) {
            return '';
        }

        return 'no result';

    }

    update(id, newData) {
        const { User } = this.server.models();

        if (newData.password) {
            newData.password = crypto.createHash('sha1').update(newData.password).digest('hex');
        }

        return User.query().updateAndFetchById(id, newData);
    }

    async login(login, h) {
        const { User } = this.server.models();

        const user = await User.query().where('mail', login.mail);

        const hashPwd = crypto.createHash('sha1').update(login.password).digest('hex');

        if (hashPwd === user[0].password) {
            return { login: 'successful' };
        }

        return h.response({ statusCode: 401, error: 'Unauthorized' }).code(401);
    }
};
