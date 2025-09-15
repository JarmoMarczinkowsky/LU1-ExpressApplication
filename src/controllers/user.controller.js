const express = require('express');
const router = express.Router();
const movieService = require('../services/login.services');
const wLogger = require('winston');

function checkAuthentication(req, res, next) {
    wLogger.info('Checking user authentication...');
    // Simulate authentication logic
    const isAuthenticated = true; // Replace with actual authentication check

    if (isAuthenticated) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

function showPage(req, res, next) {
    const model = { title: "Login" };
    const view = 'login';
    res.render(view, model);
}

module.exports = {
    checkAuthentication,
    showPage
};