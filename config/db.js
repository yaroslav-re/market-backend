const mongoose = require("mongoose");
const connectString = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(connectString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongodb connected");
  } catch (error) {
    console.log("mongodb connection error");
    console.log("error: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
