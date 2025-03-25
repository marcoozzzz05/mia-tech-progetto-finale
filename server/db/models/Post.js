const { Schema, model, default: mongoose } = require("mongoose");

const PostSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    comments: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }],
    place: {
      type: String,
      enum: ["MILANO", "BERGAMO", "ROMA", "TORINO", "CAGLIARI", "PALERMO"],
      required: true
    },
    image: {
      type: String,
      default: null
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  { strict: true, timestamps: true, versionKey: false }
);

const Post = model("Post", PostSchema);

module.exports = Post;
