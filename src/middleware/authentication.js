const logger = require('../util/logger');

module.exports = {
    authenticate: (req, res, next) => {
        const userLoggedIn = false;
        if (userLoggedIn) {
            logger.debug('User is logged in');
            next();
        } else {
            logger.warn('User is not authenticated');
            next({ error: 'Not authenticated', status: 403 });
        }
    }
}