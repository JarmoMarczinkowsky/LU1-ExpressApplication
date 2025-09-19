const logger = require('../util/logger');
const authDao = require('../dao/auth.dao');
const db = require('../dao/db.js');
const wLogger = require('../util/logger.js');
const pwHasher = require('../util/passwordhash.js');
const nowDate = require('../util/dates.js');

function login(credentials, callback) {
    // wLogger.info(`login called for email: ${credentials.email}`);
    // wLogger.debug(`login called with password: ${credentials.password}`);
    // db.query('SELECT * FROM sakila.staff WHERE email = ? AND password = ?', [credentials.email, credentials.password], (err, results) => {
    //     if (err) {
    //         return callback(err);
    //     }
    //     if (results.length === 0) {
    //         return callback(new Error('Invalid email or password'));
    //     }

    //     wLogger.info(`User ${credentials.email} logged in successfully`);
    //     // Successful login
    //     callback(null, results[0]);
    // });

    wLogger.info(`login called for email: ${credentials.email}`);

    // Step 1: fetch user by email
    db.query('SELECT * FROM sakila.staff WHERE email = ?', [credentials.email], (err, results) => {
        if (err) return callback(err);

        if (results.length === 0) {
            return callback(new Error('Invalid email'));
        }

        const user = results[0];

        // Step 2: compare password
        pwHasher.comparePassword(credentials.password, user.password.trim(), (err, isMatch) => {
            if (err) return callback(err);
            if (!isMatch) return callback(new Error('Invalid password'));

            wLogger.info(`User ${credentials.email} logged in successfully`);
            callback(null, user); // login successful
        });
    });
}

function register(userInfo, callback) {
    wLogger.info(`register called for email: ${userInfo.email}`);
    const active = true;

    pwHasher.hashPassword(userInfo.password, (err, hashed) => {
        if (err) {
            console.error('Error hashing password:', err);
            callback(err);
        } else {
            console.log('Hashed password:', hashed);
            db.query('INSERT INTO sakila.staff(first_name, last_name, address_id, email, store_id, active, username, password, last_update)'
                + ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [userInfo.first_name, userInfo.last_name, userInfo.address_id, userInfo.email, userInfo.store_id, active, userInfo.username, hashed, nowDate.getFormattedDateTime()], (err, results) => {
                    if (err) {
                        return callback(err);
                    }
                    wLogger.info(`User ${userInfo.email} registered successfully`);
                    callback(null, results.insertId);
                });

        }
    });
}

module.exports = { login, register };
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