var express = require('express');
var router = express.Router();
var pool = require('../public/javascripts/db');
var userQuery = require('../public/javascripts/adminquery');
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
                // client.query(userQuery)
                //         .then(res => {
                //             const rows = res.rows;
                //             // console.log('res ', res);
                //             console.log('ROWS ', rows);   
                            let responseObject = {};  
                           // response.json(responseObject);
                           query1 = `select * from users where username =  '${req.body.userName}' and password = '${req.body.passWord}'`;
                          //  console.log(query1);
                          //   console.log(req.body);
                           client.query(query1).then((res1) => {
                              console.log('res1 ',res1);
                              if(res1.rows && res1.rows.length>0){
                                for(let user of res1.rows){
                                   if(user.username === req.body.userName && user.password === req.body.passWord){
                                      response.json({
                                            userName: user.username,
                                            statusText:'OK',
                                            statusCode:200,
                                            url:req.baseUrl,
                                            original:req.originalUrl,
                                            userExists:true,
                                            userDetails : user
                                          });
                                          
                                   } 
                                   else {
                                        response.json({
                                            userName: user.username,
                                            passWord:user.password,
                                            statusText:'OK',
                                            statusCode:201,
                                            reqbody:req.body,
                                            url:req.baseUrl,
                                            original:req.originalUrl,
                                            userExists:false,
                                            userDetails : {}
                                          });
                                   }
                              }
                            } else {
                                 response.json({
                                            userName: req.body.userName,
                                            passWord:req.body.passWord,
                                            statusText:'OK',
                                            statusCode:201,
                                            reqbody:req.body,
                                            url:req.baseUrl,
                                            original:req.originalUrl,
                                            userExists:false,
                                            userDetails : {}
                                          });
                            }
                           }).catch(err => {
                              client.end(console.log(err));
                           });
                    //     })
                    //     .catch(err => {
                    //         client.end(console.log('Closed client connection'));
                    //         console.log(err);
                    // });
            }
         })
  // let response = {userName: 'admin',passWord:'admin',statusText:'OK',statusCode:200,reqbody:req.body,url:req.baseUrl,original:req.originalUrl};
  // res.json(response);
});

module.exports = router;