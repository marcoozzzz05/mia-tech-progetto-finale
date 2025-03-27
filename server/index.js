require("dotenv").config({ path: "./.dev.env" });
const express = require("express");
const app = express();

const db = require("./db");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
    db.connect();
    
    console.log(`Server up and running on port ${SERVER_PORT}`);
});

module.exports = app;