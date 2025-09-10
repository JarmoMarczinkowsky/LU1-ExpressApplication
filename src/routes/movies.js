var express = require('express');
var router = express.Router();

const movieController = require('../controllers/movie.controller.js');

router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getSingleMovie);

module.exports = router;