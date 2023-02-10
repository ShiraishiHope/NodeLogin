const mysql = require('mysql2');
const dotenv = require('dotenv')

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.USER_HOST,
  user: process.env.USER_,
  password: process.env.USER_PASS,
  database: process.env.USER_DB,
  port:process.env.PORT
});

module.exports = connection;
