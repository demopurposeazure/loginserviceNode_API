var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/db');


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

router.post('/', function(req, response, next) {
  console.log(req);
   pool.connect((err, client, done) => {
            //console.log(client);
            if (err) 
              throw err;
            else {
                let responseObject = {};
                var fetchuserquery = `SELECT * from users where user_id=${req.body.userId}`; 
                console.log(fetchuserquery);   
                client.query(fetchuserquery).then((res1) => {
                    console.log('res1 ',res1);    
                    response.json({ 
                        statusText:'OK',
                        statusCode:200,
                        userDetails : res1.rows
                    });
                }).catch(err => {
                    client.end(console.log(err));
                    response.status(500).send({
                        message: 'Internal server error',
                        err
                    });
                });
            }
         })
});

module.exports = router;