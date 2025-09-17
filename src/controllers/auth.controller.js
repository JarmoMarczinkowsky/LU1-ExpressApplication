const logger = require('../util/logger');
const authService = require('../services/auth.services');


const TAG = 'auth.controller';

function showLoginPage(req, res) {
    logger.info(TAG, 'showLoginPage', 'Rendering login page');
    view = 'auth/login';
    model = { title: 'Login' };
    res.render(view, model);
}

module.exports = {
    showLoginPage} 
    // login: (req, res, next) => {
    //     logger.info(TAG, 'login', 'Rendering login page');
    //     // res.render('login', { title: 'Login' });

    //     // authService.
    // },
    // register: (req, res, next) => {
    //     logger.info(TAG, 'register', 'Rendering register page');
    //     // res.render('register', { title: 'Register' });
    // },

    // handleLogin: (req, res, next) => {
    //     logger.debug(TAG, 'handleLogin', 'Handling login');
    //     authService.login(req.body, (err, user) => {
    //         if (err) {
    //             logger.error(TAG, 'handleLogin', 'Error during login: ' + err);
    //             return res.status(500).json({ message: 'Internal server error' });
    //         }
    //         //user.email
    //         //user.password
    //         //user.name
    //         req.session.user = user;

    //         return res.redirect('/');
    //     });
    // }