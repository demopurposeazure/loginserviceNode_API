var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/db');
/* GET home page. */

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
                // query = `sel * from demo where username =  '$' and password = '${req.body.passWord}'`;
             let Query;
             let responseMessage;
             if(req.body.section === 'create'){
                Query = `INSERT INTO users (user_id, username, password, email, created_on, last_login, firstname, lastname, fullname, mobile)  VALUES ((SELECT MAX(user_id) from users) +1,'${req.body.userDetails.userName}','${req.body.userDetails.passWord}','${req.body.userDetails.email}','${req.body.created_on}','${req.body.created_on}','${req.body.userDetails.firstName}','${req.body.userDetails.lastName}','${req.body.userDetails.fullName}','${req.body.userDetails.mobile}')`;
                
                responseMessage = "User successfully created";
             } else if(req.body.section === 'revise'){
                 Query = `UPDATE users SET username='${req.body.userDetails.username}' , email= '${req.body.userDetails.email}', firstname= '${req.body.userDetails.firstname}',lastname= '${req.body.userDetails.lastname}', fullname= '${req.body.userDetails.fullname}', mobile= '${req.body.userDetails.mobile}' where user_id= ${req.body.user_id}`;
                 responseMessage = "User profile successfully revised"; 
            }
                console.log(req.body);
                console.log(Query);
                client.query(Query).then((res1) => {
                    console.log('res1 ',res1);    
                    response.json({ 
                        statusText:'OK',
                        statusCode:200,
                        responseMessage: responseMessage
                    });
                }).catch(err => {
                    client.end(console.log(err));
                    response.status(500).send({
                        message: 'Sql query error',
                        err
                    });
                });
            }
         })
});

module.exports = router;