const express = require('express');
const router = express.Router();
const movieService = require('../services/movie.services');

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

function getSingleMovie(callback) {
    db.query('SELECT * FROM sakila.film WHERE film_id = 1', function (err, results, fields) {
        console.log(results);
        callback(results);
    });
}


module.exports = { simpleSelectQuery, getSingleMovie };