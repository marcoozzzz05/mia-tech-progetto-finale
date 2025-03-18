const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { hashPassword } = require("../../utilities/auth");
const { User, Post } = require("../../db");
const { authUser } = require("../../middlewares/auth");

/**
 * @path /api/posts
 * @method POST
 */
app.post("/", () => {authUser("BUSINESS")}, async (req, res) => {
    const schema = Joi.object().keys({
        userId: Joi.string().required(),
        content: Joi.string().required(),
        place: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const user = await User.findOne({ _id: data.userId, role: "BUSINESS"})
        console.log(user)
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        const post = (await new Post(data).save()).toObject();

        return res.status(201).json({postId: post._id});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = app;