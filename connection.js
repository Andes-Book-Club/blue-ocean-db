// require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'andes',
  password: 'postgres',	
  port: 5432,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
  max: 100,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
