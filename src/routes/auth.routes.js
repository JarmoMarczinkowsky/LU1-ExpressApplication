const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller.js');

router.get('/login', controller.login);
router.get('/register', controller.register);

router.post('/login', controller.handleLogin);
router.post('/register', controller.handleRegister);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out. Please try again.' });
        }
        res.redirect('/');
    });
});

module.exports = router;
