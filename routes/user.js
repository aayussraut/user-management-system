const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

router.get("/", usercontroller.view);
router.post("/", usercontroller.find);
router.get("/adduser", usercontroller.form);
router.post("/adduser", usercontroller.addUser);

module.exports = router;
