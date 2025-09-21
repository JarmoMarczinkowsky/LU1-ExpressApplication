const logger = require('../util/logger');
const authDao = require('../dao/auth.dao');
const db = require('../dao/db.js');
const wLogger = require('../util/logger.js');
const pwHasher = require('../util/passwordhash.js');
const nowDate = require('../util/dates.js');

function login(credentials, callback) {
    wLogger.info(`login called for email: ${credentials.email}`);

    // Step 1: fetch user by email
    db.query('SELECT * FROM staff WHERE email = ?', [credentials.email], (err, results) => {
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
            db.query('INSERT INTO staff(first_name, last_name, address_id, email, store_id, active, username, password, last_update)'
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

function getAllCities(callback) {
    wLogger.info('getAllCities called');
    db.query('SELECT * FROM city', (err, results) => {
        if (err) {
            wLogger.error('getAllCities', 'Error fetching cities: ' + err);
            return callback(err);
        }
        wLogger.info('getAllCities', 'Cities fetched successfully');
        callback(null, results);
    });
}

function getAllCountries(callback) {
    wLogger.info('getAllCountries called');
    db.query('SELECT * FROM country', (err, results) => {
        if (err) {
            wLogger.error('getAllCountries', 'Error fetching countries: ' + err);
            return callback(err);
        }
        wLogger.info('getAllCountries', 'Countries fetched successfully');
        callback(null, results);
    });
}

function addUserAddress(addressInfo, callback) {
    const location = `POINT(51.9225 4.47917)`; // Example coordinates (longitude latitude)
    addressInfo.location = location; // Add location to addressInfo for logging
    wLogger.info(`addUserAddress called for address: ${JSON.stringify(addressInfo.location)}`);
    db.query(
        'INSERT INTO address(address, address2, district, city_id, postal_code, phone, location, last_update) VALUES (?, ?, ?, ?, ?, ?, ST_GeomFromText(?), ?)',
        [addressInfo.address, addressInfo.address2, addressInfo.district, addressInfo.city_id, addressInfo.postal_code, addressInfo.phone, location, nowDate.getFormattedDateTime()],
        (err, results) => {
            if (err) {
                return callback(err);
            }
            wLogger.info(`Address added successfully for the new user`);
            callback(null, results.insertId);
        }
    );
}

module.exports = { login, register, addUserAddress, getAllCities, getAllCountries };
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