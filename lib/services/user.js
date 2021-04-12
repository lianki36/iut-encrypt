'use strict';

const { Service } = require('@hapipal/schmervice'); 

module.exports = class UserService extends Service {

        create(user){
             const { User } = this.server.models();
        
             return User.query().insertAndFetch(user);
        }
        
        getAll(){
                const { User } = this.server.models();
           
                return User.query();
        }

        async del(id) {
                const { User } = this.server.models();

                const nbDeleted = await User.query().deleteById(id);

                if (nbDeleted>0) {
                        return '';
                } else {
                        return 'no result'
                }
        }

        update(id, newData) {
                const { User } = this.server.models();
                
                return User.query().updateAndFetchById(id, newData);;
        }
}
