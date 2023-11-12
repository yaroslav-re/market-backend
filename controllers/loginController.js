const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

exports.createNewUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be at least 8 characters long" });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({ email, password: passwordHash, date: Date.now() });
  const savedUser = await newUser.save();

  if (savedUser) {
    return res.status(200).json({ message: "user is successfully saved" });
  }
});

exports.logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({message: "login or password missing"})
  }

  const user = await User.findOne({email})
  if (!user) {
    return res.status(404).json({message: "user is not found"})
  }

  const matchPassword = await bcrypt.compare(password, user.password)

  if (matchPassword) {
    const userSession = {email: user.email}
    req.session.user = userSession

    return res.status(200).json({message: "you have logged in successfully", userSession})
  } else {
    res.status(401).json({message: "invalid credentials"})
  }
});
