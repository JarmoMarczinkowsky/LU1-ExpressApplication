const logger = require('../util/logger');



module.exports = {
    findUserByEmail(email, callback) {
        logger.debug('auth.dao', 'findUserByEmail', 'Finding user by email: ' + email);

        const sql = 'SELECT email, password, username FROM staff WHERE email = ?;';
    }
}

        