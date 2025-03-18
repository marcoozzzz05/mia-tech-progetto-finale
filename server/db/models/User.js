const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "BUSINESS"],
        default: "USER"
    },
    metadata: {
        type: {
            business_name: String,
        },
        default: {},
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    liked_post: [{postId: mongoose.Schema.Types.ObjectId}],
    profile_image: String
}, { strict: true, timestamps: true, versionKey: false });

const User = model("User", UserSchema);

module.exports = User;