require("dotenv").config();
const cors = require("cors");

const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session);

const config = require("config");

const express = require("express");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
connectDB();

const app = express();

app.use(cors());

// middleware
app.use(express.json());

const mongoDBStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});
app.use(
  session({
    secret: "secret",
    name: "sessionID",
    store: mongoDBStore,
    resave: true,
    saveUninitialized: false,
  }),
);

// routes
app.use("/api/parts", require("./routes/partRoutes"));
app.use("/api/register", require("./routes/registerRoutes"));
app.use("/api/login", require("./routes/loginRoutes"));
app.use("/api/logout", require("./routes/loginRoutes"));
app.use("/api/isauth", require("./routes/loginRoutes"));

// errorHandler
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
