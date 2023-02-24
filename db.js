const mysql = require('mysql2/promise');

// create the connection to database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'first',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: 'root'
});

module.exports = pool;