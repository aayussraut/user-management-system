const express = require("express");
const user = require("../routes/user");

module.exports = function (app) {
  //COnnection pool

  app.use("/", user);
};
