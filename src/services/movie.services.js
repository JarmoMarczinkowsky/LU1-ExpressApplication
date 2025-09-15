const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.services');
const wLogger = require('../util/logger.js');

const db = require('../dao/db.js');

// function getMovies(callback)
// {
//     const movies = [
//         { title: "Movie 1", year: 2020 },
//         { title: "Movie 2", year: 2021 },
//         { title: "Movie 3", year: 2022 }
//     ];

//     setTimeout(() => {
//         callback(movies);
//     }, 1000);

// }

function simpleSelectQuery(callback) {
    // A simple SELECT query
    let dbResults = null;
    db.query(
    'SELECT * FROM sakila.film WHERE film_id < 10',
    function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        // dbResults = results;
        callback(results)
    }
    );

}

function getSingleMovie(movieId, callback) {
    wLogger.info(`getSingleMovie ${movieId} called`);
    db.query('SELECT * FROM sakila.film WHERE film_id = ?', [movieId], function (err, results, fields) {
        console.log(results);
        callback(results[0]);
    });
}

function createMovie(movieData, callback) {
    wLogger.info(`createMovie called with data: ${JSON.stringify(movieData)}`);

    db.query('INSERT INTO sakila.film (title, description, release_year, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
        movieData.title,
        movieData.description,
        parseInt(movieData.release_year),
        1, // default language_id
        movieData.rental_duration,
        movieData.rental_rate,
        movieData.length,
        movieData.replacement_cost,
        movieData.rating,
        movieData.special_features
    ], (err, results) => {
        if (err) {
            wLogger.error(`Error creating movie: ${err}`);
            callback(null);
        } else {
            wLogger.info(`Movie created successfully: ${results.insertId}`);
            callback(results.insertId);
        }
    });
}

module.exports = { simpleSelectQuery, getSingleMovie, createMovie };