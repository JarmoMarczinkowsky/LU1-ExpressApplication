var express = require('express');
var router = express.Router();
var middleware = require('../middleware/authentication.js');

const movieController = require('../controllers/movie.controller.js');

router.get('/', middleware.authenticate, movieController.getAllMovies);
router.get('/:id', middleware.authenticate, movieController.getSingleMovie);

module.exports = router;