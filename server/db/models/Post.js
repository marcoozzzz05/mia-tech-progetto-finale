const { Schema, model, default: mongoose } = require("mongoose");

const PostSchema = new Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    content: String,
    comments: [{ userId: mongoose.Schema.Types.ObjectId, text: String }],
    place: {
      type: "String",
      enum: ["MILANO", "BERGAMO", "ROMA", "TORINO", "CAGLIARI", "PALERMO"]
    },
    image: String,
    createdAt: { type: Date, default: Date.now },
  },
  { strict: true, timestamps: true, versionKey: false }
);

const Post = model("Post", PostSchema);

module.exports = Post;
