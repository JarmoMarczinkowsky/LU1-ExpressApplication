var express = require('express');
var router = express.Router();
var middleware = require('../middleware/authentication.js');
const wLogger = require('../util/logger.js');

const movieController = require('../controllers/movie.controller.js');

router.get('/', movieController.listMovies);

router.get('/create', movieController.showCreatePage);
router.post('/create', function(req, res, next) {
    wLogger.info("In post /create");
    movieController.createMovie(req, res, next);
});



router.get('/edit/:id', movieController.showEditForm);
router.post('/edit/:id', movieController.updateEditForm);

router.get('/:id', movieController.getSingleMovie); 


router.post('/edit/:id', function(req, res, next) {

});

module.exports = router;