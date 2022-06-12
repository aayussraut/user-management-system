//view exports
const res = require("express/lib/response");
const mysql = require("mysql");
const { connect } = require("../routes/user");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//Connect to DB
const viewall = (req, res) => {
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
};


//finding by id
const find = (req, res) => {
  const searchItem = req.body.search;

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
};


// adding form
const form = (req, res) => {
  return res.render("add-user");
};


//adding new user
const addUser = (req, res) => {
  const {first_name,last_name,phone,email,comments}=req.body;
  connection.query(
    "Insert into user(first_name,last_name,phone,email,comments) values(?,?,?,?,?)",
    [first_name, last_name, phone, email, comments],
    (err, rows) => {
      if (err) {
        console.log("Error querying DB", err);
        return;
      }
      return res.render("add-user", { msg: "User Added Successfully." });
    }
  );
};

//editing form
const edit = (req, res) => {
  connection.query(
    `SELECT * FROM user WHERE id =?`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log("Error querying DB", err);
        return;
      }
      console.log(rows);
      return res.render("edit-user", { rows });
    }
  );
};


//updating the data
const update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  connection.query(
    "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
    [first_name, last_name, email, phone, comments, req.params.id],
    (err, rows) => {
      if (err) {
        console.log("Error querying DB", err);
        return;
        
      } 
      connection.query(
        `SELECT * FROM user WHERE id =?`,
        [req.params.id],
        (err, rows) => {
          if (err) {
            console.log("Error querying DB", err);
            return;
          }
          console.log(rows);
          return res.render("edit-user", { rows ,msg:`${first_name}'s record has been updated`});
        }
      );
    }
  );
};

const deleteUser=(req,res)=>{
  // connection.query(
  //   "DELETE FROM user WHERE user.id=?",[req.params.id],(err,result)=>{
  //     if(err){
  //       console.log("Error querying DB",err);
  //       return
  //     }
  //     res.redirect("/")
  //   }
  // )

  connection.query(
    "UPDATE user SET status=? WHERE id = ?",
    ["removed", req.params.id],
    (err, rows) => {
      if (err) {
        console.log("Error querying DB", err);
        return;
        
      } 
      res.redirect("/")
    })
}

const viewUser=(req,res)=>{
  connection.query("SELECT * FROM user WHERE  user.id=?",[req.params.id],(err,rows)=>{
    if(err){
      console.log("Error querying DB".err);
      return
    }
    res.render("view-user",{rows})
  })
}

module.exports = { viewall, find, addUser, form, edit, update ,deleteUser,viewUser};
