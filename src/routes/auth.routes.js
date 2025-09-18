const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

router.get('/', (req, res) => {
    res.send('Auth home page. Go to /login to log in.');
});

router.get('/login', authController.showLoginPage);
router.post('/login', authController.postLogin);

router.get('/register', authController.showRegisterPage);
// router.get('/register', controller.register);

// router.post('/login', controller.handleLogin);
// router.post('/register', controller.handleRegister);

// router.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Could not log out. Please try again.' });
//         }
//         res.redirect('/');
//     });
// });

module.exports = router;
