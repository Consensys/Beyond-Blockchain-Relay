const mysql = require('mysql');
const util = require('util');

const dbConfig = require('./db.config.js');

const db = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: dbConfig.connectionLimit,
  connectTimeout: dbConfig.connectTimeout,
  acquireTimeout: dbConfig.acquireTimeout,
  timeout: dbConfig.timeout,
  timezone: 'utc',
});

db.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) {
    connection.release();
  }
});

db.query = util.promisify(db.query);

module.exports = db;
