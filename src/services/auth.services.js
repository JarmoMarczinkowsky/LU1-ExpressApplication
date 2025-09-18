const logger = require('../util/logger');
const authDao = require('../dao/auth.dao');
const db = require('../dao/db.js');
const wLogger = require('../util/logger.js');

function login( credentials, callback) {
    wLogger.info(`login called for email: ${credentials.email}`);
    wLogger.debug(`login called with password: ${credentials.password}`);
    db.query('SELECT * FROM sakila.staff WHERE email = ? AND password = ?', [credentials.email, credentials.password], (err, results) => {
        if (err) {
            return callback(err);
        }
        if (results.length === 0) {
            return callback(new Error('Invalid email or password'));
        }

        wLogger.info(`User ${credentials.email} logged in successfully`);
        // Successful login
        callback(null, results[0]);
    });
}

module.exports = { login }
    // login(credentials, callback) {
    //     credentials = {
    //         email: "",
    //         password: ""
    //     }

    //     logger.debug('auth.services', 'login', 'Logging in user with email: ' + credentials.email);
    //     db.findUserByEmail(credentials.email, (err, user) => {
    //         if (err) {
    //             return callback(err);
    //         }
    //         if (!user) {
    //             return callback( {})
    //         }

    //     })
    // }