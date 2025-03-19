const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { SERVER_PRIVATE_KEY } = process.env;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

const generateToken = (payload) => {
    return jwt.sign(payload, SERVER_PRIVATE_KEY);
}

const verifyToken = (token) => {
    return jwt.verify(token, SERVER_PRIVATE_KEY);
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
}