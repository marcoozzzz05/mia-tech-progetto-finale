const express = require("express");
const app = express.Router();
const mongoose = require('mongoose');
const Joi = require("joi");
const { hashPassword } = require("../../utilities/auth");
const { User, Post } = require("../../db");
const upload = require("../../utilities/upload");
const fs = require("fs");
const path = require("path");

/**
 * @route POST /api/users
 * @description Create a new user account
 * @access Public
 * @body {
 *   first_name: string (required),
 *   last_name: string (required),
 *   email: string (required, unique),
 *   password: string (required),
 *   role: string (required) - Either "USER" or "BUSINESS"
 * }
 * @returns {Object} Created user object (without password)
 */
app.post("/", async (req, res) => {
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().valid("USER", "BUSINESS").required(),
        metadata: Joi.object().when('role', {
            is: 'BUSINESS',
            then: Joi.object({
                business_name: Joi.string().required()
            }).required(),
            otherwise: Joi.object().default({})
        })
    });

    try {
        const data = await schema.validateAsync(req.body);
        data.password = await hashPassword(data.password);
        const user = (await new User(data).save()).toObject();
        delete user.password;
        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route POST /api/users/:userId/profile-picture
 * @description Upload or update user's profile picture
 * @access Public
 * @param {string} userId - User's ID
 * @body FormData with field 'profile_picture' containing image file
 * @returns {Object} Success message and profile image URL
 */
app.post("/:userId/profile-picture", upload.single('profile_picture'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            // Delete the uploaded file if user not found
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: "User not found" });
        }

        // Delete old profile picture if exists
        if (user.profile_image) {
            const oldImagePath = path.join(__dirname, '../../assets', user.profile_image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update user with new profile picture path
        user.profile_image = req.file.filename;
        await user.save();

        return res.status(200).json({
            message: "Profile picture updated successfully",
            profile_image: `/assets/${req.file.filename}`
        });
    } catch (err) {
        console.log(err);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route PUT /api/users/:userId
 * @description Update user profile information
 * @access Public
 * @param {string} userId - User's ID
 * @body {
 *   first_name: string (optional),
 *   last_name: string (optional),
 *   email: string (optional),
 *   metadata: object (optional)
 * }
 * @returns {Object} Updated user object
 */
app.put("/:userId", async (req, res) => {
    const schema = Joi.object().keys({
        first_name: Joi.string(),
        last_name: Joi.string(),
        email: Joi.string().email(),
        metadata: Joi.object()
    });

    try {
        const data = await schema.validateAsync(req.body);
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: data },
            { new: true, select: '-password' }
        );
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route GET /api/users/:userId/favorites
 * @description gets user favorite posts
 * @access Public
 * @param {string} userId - User's ID
 * @body {
 *   first_name: string (optional),
 *   last_name: string (optional),
 *   email: string (optional),
 *   metadata: object (optional)
 * }
 * @returns {Object} list of user liked posts
 */
app.get("/:userId/favorites", async (req, res) => {
    const posts = await Post.find({ likes: { $in: new mongoose.Types.ObjectId(req.params.userId) } })
        .populate('userId', 'first_name last_name profile_image')
        .populate('comments.userId', 'first_name last_name profile_image');
    return res.status(200).json(posts);
});

/**
 * @route POST /api/users/:userId/follow
 * @description Follow another user
 * @access Public
 * @param {string} userId - ID of user to follow
 * @body {
 *   followerId: string (required) - ID of the user who wants to follow
 * }
 * @returns {Object} Success message
 */
app.post("/:userId/follow", async (req, res) => {
    try {
        const followerId = req.body.followerId;
        const userToFollow = await User.findById(req.params.userId);
        const follower = await User.findById(followerId);

        if (!userToFollow || !follower) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userToFollow._id.equals(follower._id)) {
            return res.status(400).json({ message: "Cannot follow yourself" });
        }

        if (follower.following.includes(userToFollow._id)) {
            return res.status(400).json({ message: "Already following this user" });
        }

        follower.following.push(userToFollow._id);
        userToFollow.followers.push(follower._id);

        await follower.save();
        await userToFollow.save();

        return res.status(200).json({ message: "Successfully followed user" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route GET /api/users/:userId
 * @description Get user profile information
 * @access Public
 * @param {string} userId - User's ID
 * @returns {Object} User profile object (without password)
 */
app.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = app;