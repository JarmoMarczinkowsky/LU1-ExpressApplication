var express = require('express');
var router = express.Router();
const wLogger = require('../util/logger');

/* GET home page. */
const model = { title: "My Sakila browser" };
const view = 'index';
router.get('/', function(req, res, next) {
    wLogger.info("In index route");
  res.render(view, model);
});

module.exports = router;
