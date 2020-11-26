var express = require('express');
var router = express.Router();
var graphdata = require('./graphdata');
var pool = require('../public/javascripts/db');
var grapghquery = require('../public/javascripts/graphquery');
// let jsondata = require('../response/graph');
//let fs = require('fs');

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

// const query1 = `
//         DROP TABLE IF EXISTS demoinventory;
//         CREATE TABLE demoinventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
//         INSERT INTO demoinventory (name, quantity) VALUES ('banana', 150);
//         INSERT INTO demoinventory (name, quantity) VALUES ('orange', 154);
//         INSERT INTO demoinventory (name, quantity) VALUES ('apple', 100);
//     `;

//console.log('Connected ', pool);


/* GET home page. */
router.get('/', function(req, response, next) {
    pool.connect((err, client, done) => {
            //console.log(client);
            if (err) 
              throw err;
            else {
                //   const query2 = 'SELECT * FROM usergraph;';
                    //console.log(JSON.parse(JSON.stringify(jsondata)));
                    client.query(grapghquery)
                        .then(res => {
                            const rows = res.rows;
                            // console.log('res ', res);
                            console.log('ROWS ', rows);
                            // rows.map(row => {
                            //     console.log(`Read: ${JSON.stringify(row)}`);
                            // });
                            // let tableRow = rows;
                            // graphdata.rows = tableRow;

                            let responseObject = {single:[], multi:[], gauzesingle:[]};
                            for (let data of rows){
                                responseObject.single.push({name:data.name, value:data.value});
                                responseObject.multi.push({name:data.name, value:data.value, [data.extra]:{code:data.code}});
                                responseObject.gauzesingle.push({name:data.name, value:data.value});

                            }
                            responseObject.statusText = 'OK';
                            responseObject.statusCode = 200;
                            response.json(responseObject);
                        })
                        .catch(err => {
                            client.end(console.log('Closed client connection'));
                            console.log(err);
                    });
                
            }
    
  });
  //console.log(graphdata);
//   graphdata.rows = tableRow;
//   res.json(graphdata);
});

module.exports = router;