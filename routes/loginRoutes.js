const UserSchema = require("../models/UserSchema")
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router()
const loginController = require("../controllers/loginController");

router.post("/register").post(loginController.createNewUser)

module.exports = router