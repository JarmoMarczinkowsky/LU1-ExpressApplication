var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller.js');
const wLogger = require('winston');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', userController.showPage);

module.exports = router;
