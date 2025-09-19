const bcrypt = require('bcrypt');
const wLogger = require('./logger.js');
const { json } = require('express');

const TAG = 'passwordhash.js';


// User registration
function hashPassword(password, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return callback(err);

        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) return callback(err);
            callback(null, hashedPassword);
        });
    });
}

// Compare a plaintext password with a hashed password
function comparePassword(plainPassword, hashedPassword, callback) {
    wLogger.debug(`Plain pw: ${plainPassword}, hashed pw: ${hashedPassword}, Comparing passwords`);
    
    bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
        wLogger.debug(`Password match result: ${isMatch}`);
        if (err) return callback(err);
        callback(null, isMatch);
    });
}
    
module.exports = { hashPassword, comparePassword };