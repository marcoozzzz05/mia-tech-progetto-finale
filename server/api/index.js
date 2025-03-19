const express = require("express");
const app = express.Router();

/**
 * @path /api/users
 */
app.use("/users", require("./routes/users"));

app.use("/posts", require("./routes/posts"))

app.use("/sayHello", require("./routes/sayHello"));

module.exports = app;