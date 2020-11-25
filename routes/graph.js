var express = require('express');
var router = express.Router();
var graphdata = require('./graphdata');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(graphdata);
  res.json(graphdata);
});

module.exports = router;