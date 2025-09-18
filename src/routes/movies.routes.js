var express = require("express");
var router = express.Router();
var middleware = require("../middleware/authentication.js");
const wLogger = require("../util/logger.js");

const movieController = require("../controllers/movie.controller.js");

router.get("/", middleware.authenticate, movieController.listMovies);

router.get("/create", middleware.authenticate, movieController.showCreatePage);
router.post("/create", middleware.authenticate, function (req, res, next) {
  wLogger.info("In post /create");
  movieController.createMovie(req, res, next);
});

router.get("/edit/:id", middleware.authenticate, movieController.showEditForm);
router.post("/edit/:id", middleware.authenticate, movieController.updateEditForm);

router.get("/:id", middleware.authenticate, movieController.getSingleMovie);

// router.post('/edit/:id', function(req, res, next) {
// });

module.exports = router;
