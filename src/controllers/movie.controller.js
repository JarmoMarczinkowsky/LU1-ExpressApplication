const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.services');
const { log } = require('winston');


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
    movieService.getSingleMovie((movieId) =>
    {
        log(movieId);
        const model = { title: "Movie", movie: movieId };
        const view = 'movie';
        res.render(view, model);
    })
}

module.exports = { getAllMovies, getSingleMovie };