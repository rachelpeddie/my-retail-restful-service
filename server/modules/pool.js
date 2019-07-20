const pg = require('pg');
const url = require('url');

let config = {};

// setup to connect to database - conditional for future Heroku deployment
if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // required true for Heroku
    max: 10,
    idleTimeoutMillis: 30000,
  };
} else {
  config = {
    host: 'localhost',
    port: 5432,
    database: process.env.DATABASE_NAME || 'myRetail-details',
    max: 10,
    idleTimeoutMillis: 30000,
  };
};

// setup pg to connect to database using correct config
const pool = new pg.Pool(config);

// pool will log when connect to database
pool.on('connect', () => {
  console.log(`Sucessfully connected to database!`);
});

// pool will log error if occurs when connecting to database
pool.on('error', (error) => {
  console.log(`Error connecting to database`, error);
  process.exit(-1);
});

module.exports = pool;