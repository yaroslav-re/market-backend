const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name of the part"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "please provide description of the part"],
  },
  rating: {
    type: Number,
    required: [true, "please provide rating of the part"],
  },
  price: {
    type: Number,
    required: [true, "please provide price of the part"],
  },
});

const Part = mongoose.model("Part", partSchema);

module.exports = Part;
