const express = require("express");
const app = express.Router();

/**
 * @path /auth/token
 */
app.use("/token", require("./routes/token"));

module.exports = app;