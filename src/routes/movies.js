var express = require('express');
var router = express.Router();
var middleware = require('../middleware/authentication.js');

const movieController = require('../controllers/movie.controller.js');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getSingleMovie);

module.exports = router;