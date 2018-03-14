const pg = require('pg');
const pgCamelCase = require('pg-camelcase');
const { URL } = require('url');

pgCamelCase.inject(pg); // https://github.com/hoegaarden/pg-camelcase
const { Pool } = pg;

let pool;

// help test suite
function memorizedPool() {
  if (pool) return pool;

  const url = new URL(process.env.DATABASE_URL);

  const config = {
    user: url.username,
    password: url.password,
    host: url.hostname,
    port: url.port,
    database: url.pathname.split('/')[1],
    ssl: process.NODE_ENV === 'production',
  };

  pool = new Pool(config);

  return pool;
}

module.exports = {
  query: async (text, params) => {
    // console.time('databaseQuery');
    const res = await memorizedPool().query(text, params);
    // console.timeEnd('databaseQuery');
    return res;
  },
};
