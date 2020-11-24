var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({key : 'respond with a resource',value:'value'});
});

module.exports = router;
