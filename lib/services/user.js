'use strict';

const { Service } = require('@hapipal/schmervice');
const crypto = require('crypto');
const Jwt = require('@hapi/jwt');

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
    
    getUser(id) {
        const { User } = this.server.models();

        return User.query().findById(id);
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

        const user = (await User.query().where('mail', login.mail))[0];

        const hashPwd = crypto.createHash('sha1').update(login.password).digest('hex');

        if (hashPwd === user.password) {
            const token = Jwt.token.generate(
                {
                    aud: 'urn:audience:iut',
                    iss: 'urn:issuer:iut',
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.mail,
                    scope: user.scope
                },
                {
                    key: 'password-token-hyper-secret',
                    algorithm: 'HS512'
                },
                {
                    ttlSec: 14400
                }
            );

            return h.response({ statusCode: 201, login: 'successful', token: token }).code(201);
        }

        return h.response({ statusCode: 401, error: 'Unauthorized' }).code(401);
    }
};
