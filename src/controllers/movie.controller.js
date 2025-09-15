const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.services');
const wLogger = require('../util/logger');


function getAllMovies(req, res, next) {
    //vraag de data via de dao laag op uit de database
    // movieService.getMovies((movies) => {
    //     const model = { title: "Movies", movies: movies };
    //     //hier komt de data van de service terug -> model
    //     const view = 'movies';
    //     res.render(view, model);

    // });

    movieService.simpleSelectQuery((movies) => {
        const model = { title: "Movies", movies: movies };
        const view = 'movies';
        res.render(view, model);
    });
}

function getSingleMovie(req, res, next) {
    movieService.getSingleMovie(req.params.id, (movie) => {

        wLogger.info("Req params id: " + req.params.id);
        wLogger.info("In controller, movie: " + movie);
        const model = { title: "Movie", singleMovie: movie };
        const view = 'movie';
        res.render(view, model);
    });
}

function showCreatePage(req, res, next) {
    wLogger.info("In showCreatePage");
    const model = { title: "Create Movie" };
    const view = 'create';
    res.render(view, model);
}

function createMovie(req, res, next) {
    // wLogger.info("[moviecontroller] Full movie data: " + JSON.stringify(req.body));
    movieService.createMovie(req.body, (result) => {
        if (result) {
            res.redirect('/movies');
        } else {
            res.status(500).send("Error creating movie");
        }
    });
}

module.exports = { getAllMovies, getSingleMovie, showCreatePage, createMovie };