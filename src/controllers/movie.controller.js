const express = require("express");
const router = express.Router();
const movieService = require("../services/movie.services");
const wLogger = require("../util/logger");

function getAllMovies(req, res, next) {
  //vraag de data via de dao laag op uit de database
  // movieService.getMovies((movies) => {
  //     const model = { title: "Movies", movies: movies };
  //     //hier komt de data van de service terug -> model
  //     const view = 'movies';
  //     res.render(view, model);

  // });

  movieService.simpleSelectQuery((movies) => {
    // wLogger.info("In controller, movies: " + movies);
    const model = { title: "Movies", movies: movies };
    const view = "movies";
    res.render(view, model);
  });
}

function getSingleMovie(req, res, next) {
  movieService.getSingleMovie(req.params.id, (movie) => {
    wLogger.info("Req params id: " + req.params.id);
    wLogger.info("In controller, movie: " + movie);
    const model = { title: "Movie", singleMovie: movie };
    const view = "movie";
    res.render(view, model);
  });
}

function showCreatePage(req, res, next) {
  wLogger.info("In showCreatePage");
  const model = { title: "Create Movie", movie: {} };
  const view = "movie-form";
  res.render(view, model);
}

function createMovie(req, res) {
  // wLogger.info("[moviecontroller] Full movie data: " + JSON.stringify(req.body));
  movieService.createMovie(req.body, (result) => {
    if (result) {
      // res.status(200).send();
      res.redirect("/movies");
    } else {
      res.status(500).send("Error creating movie, please try again.");
    }
  });
}

function showEditForm(req, res) {
  movieService.getSingleMovie(req.params.id, (movie) => {
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    // wLogger.info("In controller, movie: " + movie);
    const model = { title: "Edit Movie", movie };
    const view = "movie-form";
    res.render(view, model);
  });
}

function updateEditForm(req, res) {
  const movieId = req.params.id;
  
  // Pass req.body directly
  movieService.updateMovie(movieId, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.redirect(`/movies/${movieId}`);
  });
}

function listMovies(req, res) {
  // Default: page 1, limit 10
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  movieService.getMoviesWithCount(limit, offset, (err, result) => {
    if (err) return res.status(500).send(err);

    const { movies, totalCount } = result;
    const totalPages = Math.ceil(totalCount / limit);

    res.render("movies", {
      title: "Movies",
      movies,
      currentPage: page,
      totalPages,
    });
  });
}

module.exports = {
  getAllMovies,
  getSingleMovie,
  showCreatePage,
  createMovie,
  showEditForm,
  updateEditForm,
  listMovies,
};
