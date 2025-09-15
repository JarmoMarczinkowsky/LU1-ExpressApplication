const logger = require('../util/logger');
const authDao = require('../dao/auth.dao');

module.exports = {
    login(credentials, callback) {
        credentials = {
            email: "",
            password: ""
        }

        logger.debug('auth.services', 'login', 'Logging in user with email: ' + credentials.email);
        authDao.findUserByEmail(credentials.email, (err, user) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback( {})
            }

        })
    }
}