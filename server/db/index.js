const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URI);

        console.log("Database connected")
    } catch(err) {
        throw err;
    }
}

const disconnect = async () => {
    try {
        await mongoose.disconnect();

        console.log("Database disconnected")
    } catch (err) {
        throw err;
    }
} 

const models = {
    User: require("./models/User"),
    Post: require("./models/Post")
}

module.exports = {
    connect,
    disconnect,
    ...models,
}