const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { User } = require("../../db");
const { comparePassword, generateToken } = require("../../utilities/auth");

/**
 * @path /auth/token?role=[user|business]
 * @method POST
 */
app.post("/", async (req, res) => {
    const role = req?.query?.role?.toUpperCase() || "USER";
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const user = await User.findOne({ email: data.email }, null, { lean: true });

        if (!user) return res.status(403).json({ message: "Not Authorized" });

        if (!await comparePassword(data.password, user.password)) return res.status(403).json({ message: "Not Authorized" });

        const token = generateToken({ _id: user._id, role: user.role });

        delete user.password;

        return res.status(201).json({ token, user });
    } catch(err) { 
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = app;