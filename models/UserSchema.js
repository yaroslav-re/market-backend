const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
	email: {
    type: String,
    required: [true, "please provide email of the part"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide password of the part"],
  },
  date: {
    type: Date,
		default: Date.now,
  },

})

const User = mongoose.model("User", UserSchema);

module.exports = User