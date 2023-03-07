const { Schema, Types, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    comments: [{ type: Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = {
  Post,
};
