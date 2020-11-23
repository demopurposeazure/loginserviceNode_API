var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req);
  let response = {userName: 'admin',passWord:'admin',statusText:'OK',statusCode:200,reqbody:req.body,url:req.baseUrl};
  res.json(response);
});

module.exports = router;