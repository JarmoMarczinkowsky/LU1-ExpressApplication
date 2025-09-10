var express = require('express');
var router = express.Router();

/* GET home page. */
const model = { title: "My Sakila browser" };
const view = 'index';
router.get('/', function(req, res, next) {
  res.render(view, model);
});

module.exports = router;
