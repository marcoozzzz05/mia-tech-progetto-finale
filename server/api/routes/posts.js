const express = require("express");
const app = express.Router();
const crypto = require("crypto");
const Joi = require("joi");
const { User, Post } = require("../../db");
const upload = require("../../utilities/upload");
const fs = require("fs");
const path = require("path");

/**
 * @route POST /api/posts
 * @description Create a new post (business users only)
 * @access Public
 * @body FormData with fields:
 *   - userId: string (required) - ID of the business user
 *   - title: string (required) - Post title
 *   - content: string (required) - Post content
 *   - place: string (required) - One of: MILANO, BERGAMO, ROMA, TORINO, CAGLIARI, PALERMO
 *   - image: file (optional) - Post image
 * @returns {Object} Created post object
 */
app.post("/", upload.single('image'), async (req, res) => {
    const schema = Joi.object().keys({
        userId: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
        place: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const user = await User.findOne({ _id: data.userId, role: "BUSINESS" });
        if (!user) return res.status(401).json({ message: "Only business users can create posts" });

        // Add image path if file was uploaded
        if (req.file) {
            data.image = req.file.filename;
        }

        const post = (await new Post(data).save()).toObject();
        return res.status(201).json(post);
    } catch (err) {
        console.log(err);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route PUT /api/posts/:postId
 * @description Update an existing post (business users only)
 * @access Public
 * @param {string} postId - Post's ID
 * @body FormData with fields:
 *   - title: string (optional) - Updated post title
 *   - content: string (optional) - Updated post content
 *   - place: string (optional) - Updated place
 *   - image: file (optional) - New post image
 * @returns {Object} Updated post object
 */
app.put("/:postId", async (req, res) => {
    const schema = Joi.object().keys({
        title: Joi.string(),
        content: Joi.string(),
        image: Joi.string(),
        place: Joi.string(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const post = await Post.findById(req.params.postId);

        if (!post) return res.status(404).json({ message: "Post not found" });

        const user = await User.findOne({ _id: post.userId, role: "BUSINESS" });
        if (!user) return res.status(401).json({ message: "Only business users can edit posts" });

        // Handle image update if new file is uploaded
        if (req.body.image && req.body.image.startsWith('data:image')) {
            // Delete old image if exists
            if (post.image) {
                const oldImagePath = path.join(__dirname, '../../assets', post.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            let uuid = crypto.randomUUID();
            const imageData = req.body.image.split(',');
            const mimeType = imageData[0].substring(5, imageData[0].indexOf(';'));
            const filename = `${uuid}.${mimeType.substring(mimeType.indexOf('/') + 1)}`;
            const decoded = Buffer.from(imageData[1], "base64");
            const newImagePath = path.join(__dirname, '../../assets', filename);
            fs.writeFileSync(newImagePath, decoded);
            data.image = filename;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: data },
            { new: true }
        );
        return res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


/**
 * @route GET /api/posts/latest (o /api/posts)
 * @description Get the latest posts from all users
 * @access Public
 * @returns {Array} Array of latest posts with populated user and comment information
 */
app.get("/latest", async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('userId', 'first_name last_name profile_image')
            .populate('comments.userId', 'first_name last_name profile_image')
            .sort({ createdAt: -1 })
            .limit(20); // Puoi regolare il limite
        return res.status(200).json(posts);
    } catch (err) {
        console.error("Backend - Error fetching latest posts:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


/**
 * @route GET /api/posts/:postId
 * @description Get a specific post by ID
 * @access Public
 * @param {string} postId - Post's ID
 * @returns {Object} Post object with populated user and comment information
 */
app.get("/:postId", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
            .populate('userId', 'first_name last_name profile_image')
            .populate('comments.userId', 'first_name last_name profile_image');

        if (!post) return res.status(404).json({ message: "Post not found" });
        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route GET /api/posts/user/:userId
 * @description Get all posts from a specific user
 * @access Public
 * @param {string} userId - User's ID
 * @returns {Array} Array of posts with populated user and comment information
 */
app.get("/user/:userId", async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId })
            .populate('userId', 'first_name last_name profile_image')
            .populate('comments.userId', 'first_name last_name profile_image')
            .sort({ createdAt: -1 });
        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route GET /api/posts/followed/:userId
 * @description Get latest 20 posts from users that the specified user follows
 * @access Public
 * @param {string} userId - User's ID
 * @returns {Array} Array of posts with populated user and comment information
 */
app.get("/followed/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const posts = await Post.find({ userId: { $in: user.following } })
            .populate('userId', 'first_name last_name profile_image')
            .populate('comments.userId', 'first_name last_name profile_image')
            .sort({ createdAt: -1 })
            .limit(20);

        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route GET /api/posts/search
 * @description Search posts by title, content, or place
 * @access Public
 * @query {string} query - Search term
 * @returns {Array} Array of matching posts with populated user and comment information
 */
app.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: "Search query is required" });

        const posts = await Post.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { place: { $regex: query, $options: 'i' } }
            ]
        })
            .populate('userId', 'first_name last_name profile_image')
            .populate('comments.userId', 'first_name last_name profile_image')
            .sort({ createdAt: -1 });

        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route GET /api/posts/place/:place
 * @description Get all posts from a specific place
 * @access Public
 * @param {string} place - One of: MILANO, BERGAMO, ROMA, TORINO, CAGLIARI, PALERMO
 * @returns {Array} Array of posts with populated user and comment information
 */
app.get("/place/:place", async (req, res) => {
    try {
        const posts = await Post.find({ place: req.params.place.toUpperCase() })
            .populate('userId', 'first_name last_name profile_image')
            .populate('comments.userId', 'first_name last_name profile_image')
            .sort({ createdAt: -1 });
        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route POST /api/posts/:postId/like
 * @description Like a post
 * @access Public
 * @param {string} postId - Post's ID
 * @body {
 *   userId: string (required) - ID of the user liking the post
 * }
 * @returns {Object} Updated post object with likes array
 */
app.post("/:postId/like", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "User has already liked this post" });
        }

        // Add user to likes array
        post.likes.push(userId);
        await post.save();

        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route DELETE /api/posts/:postId
 * @description DELETE a specific post by ID
 * @access Public
 * @param {string} postId - Post's ID
 * @returns {Object}SUCESS 200
 */

app.delete("/:postId", async (req, res) => {
    try {
        console.log(req);
        const post = await Post.findByIdAndDelete(req.params.postId);

        if (!post) return res.status(404).json({ message: "Post not found" });
        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route DELETE /api/posts/:postId/like
 * @description Unlike a post
 * @access Public
 * @param {string} postId - Post's ID
 * @body {
 *   userId: string (required) - ID of the user unliking the post
 * }
 * @returns {Object} Updated post object with likes array
 */
app.delete("/:postId/like", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user has liked the post
        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: "User has not liked this post" });
        }

        // Remove user from likes array
        post.likes = post.likes.filter(id => id.toString() !== userId);
        await post.save();

        return res.status(200).json(post);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

/**
 * @route GET /api/posts/:postId/likes
 * @description Get likes count and check if a user has liked the post
 * @access Public
 * @param {string} postId - Post's ID
 * @query {string} userId - Optional user ID to check if they liked the post
 * @returns {Object} Likes count and user's like status
 */
app.get("/:postId/likes", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const response = {
            likesCount: post.likes.length
        };

        // If userId is provided, check if that user has liked the post
        if (req.query.userId) {
            response.hasLiked = post.likes.includes(req.query.userId);
        }

        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = app;