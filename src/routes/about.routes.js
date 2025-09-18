var express = require('express');
var router = express.Router();
var middleware = require('../middleware/authentication.js');
const wLogger = require('../util/logger.js');

// const movieController = require('../controllers/movie.controller.js');

router.get('/', function(req, res, next) {
    wLogger.info("In get /about");
    
    if (!req.session.visits) req.session.visits = 0;
    req.session.visits++;
    res.render('about', { title: 'About Us', visits: req.session.visits });
});

module.exports = router;
