const { Pool } = require('pg');
// var pgp = require('pg-promise')(/* options */)
// var cn = pgp('postgres://demoserveradmin@demoserverdatabase:demoPurpose123@demoserverdatabase.postgres.database.azure.com:5432/postgres');
// console.log(cn);
// const db = pgp(cn);
// console.log(db);

//let connectionstring = 'postgres://demoserveradmin@demoserverdatabase:demoPurpose123@demoserverdatabase.postgres.database.azure.com:5432/postgres';
const pool = new Pool({
  user: 'demoserveradmin@demoserverdatabase',
  host: 'demoserverdatabase.postgres.database.azure.com',
  database: 'postgres',
  password: 'demoPurpose123',
  port: 5432,
});

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err)
//   process.exit(-1)
// });

module.exports = pool;