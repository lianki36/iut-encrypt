'use strict';

const { Service } = require('@hapipal/schmervice');

module.exports = class FilmService extends Service {

    create(film) {
        const { Film } = this.server.models();
        const { mailService } = this.server.services();

        mailService.mailNewFilm()

        return Film.query().insertAndFetch(film);
    }

    getAll() {
        const { Film } = this.server.models();

        return Film.query();
    }
    
    getFilm(id) {
        const { Film } = this.server.models();

        return Film.query().findById(id);
    }

    async del(id) {
        const { Film } = this.server.models();

        const nbDeleted = await Film.query().deleteById(id);

        if (nbDeleted > 0) {
            return '';
        }

        return 'no result';
    }

    async update(id, newData) {
        const { Film, User, Like } = this.server.models();
        const { mailService } = this.server.services();

        const like = (await Like.query().select('idUser').where('idFilm', id)).map(iduser => iduser.idUser)
        const users = (await User.query().whereIn('id', like)).map(user => user.mail)
        mailService.mailUpdateFilm(users)

        return Film.query().updateAndFetchById(id, newData);
    }

    like(idFilm, idUser) {
        const { Like } = this.server.models();

        return Like.query().insert({idUser, idFilm})
    }
    
    unlike(idFilm, idUser) {
        const { Like } = this.server.models();

        return Like.query().delete().where({ idUser: idUser, idFilm: idFilm});
    }
};
