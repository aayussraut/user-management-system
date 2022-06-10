//view exports
const res = require("express/lib/response");
const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//Connect to DB
const view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error connecting to DB", err);
      return;
    } else {
      connection.query(
        "SELECT * FROM user WHERE user.status='active'",
        [],
        (err, rows) => {
          if (err) {
            console.log("Error querying DB", err);
            return;
          }
          return res.render("index", { rows });
        }
      );
    }
  });
};

const find = (req, res) => {
  const searchItem = req.body.search;
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error connecting to DB", err);
      return;
    } else {
      connection.query(
        "SELECT * FROM user WHERE first_name=? OR last_name=? ",
        [searchItem, searchItem],
        (err, rows) => {
          if (err) {
            console.log("Error querying DB", err);
            return;
          }
          return res.render("index", { rows });
        }
      );
    }
  });
};

module.exports = { view, find };
