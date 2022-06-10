const mysql = require("mysql");

require("dotenv").config();

module.exports = function () {
  const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });

  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error connecting to DB", err);
      return;
    }
    console.log("Connected to DB");
  });
};
