require("dotenv").config();
const cors = require("cors");

const express = require("express");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
connectDB();

const app = express();

app.use(cors());

// middleware
app.use(express.json());

// routes
app.use("/api/parts", require("./routes/partRoutes"));
app.use("/api/register", require("./routes/loginRoutes"))

// errorHandler
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
