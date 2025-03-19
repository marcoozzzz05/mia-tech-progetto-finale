const express = require("express");
const app = express.Router();

/**
 * @path /api/sayHello
 * @method GET
 */
app.get("/", async (req, res) => {
    res.status(200).json({ message: "Hello,BANANA!" });
});

module.exports = app;