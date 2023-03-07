const { Schema, Types, model } = require("mongoose");

const commentSchema = new Schema(
  {
    comment: { type: String, required: true },
    author: { type: Types.ObjectId, ref: "User" },
  
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = {
  Comment,
};
