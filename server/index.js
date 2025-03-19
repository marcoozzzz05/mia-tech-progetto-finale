require("dotenv").config({ path: "./.dev.env" });
const express = require("express");
const app = express();

const db = require("./db");

const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
    db.connect();
    
    console.log(`Server up and running on port ${SERVER_PORT}`);
});