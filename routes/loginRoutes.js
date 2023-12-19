const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router
  .route("/")
  .post(loginController.logIn)
  .get(loginController.isAuth)
  .delete(loginController.logOut);

module.exports = router;
