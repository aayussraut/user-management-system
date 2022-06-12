const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/usercontroller");

router.get("/", usercontroller.viewall);
router.post("/", usercontroller.find);
router.get("/adduser", usercontroller.form);
router.post("/adduser", usercontroller.addUser);
router.get("/editUser/:id", usercontroller.edit);
router.post("/editUser/:id", usercontroller.update);
router.get("/deleteUser/:id", usercontroller.deleteUser);
router.get("/viewUser/:id", usercontroller.viewUser);

module.exports = router;
