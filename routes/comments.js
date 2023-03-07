const express = require("express");
const {
  getComment,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

const commentRouter = express.Router();

commentRouter.get("/", getComments);
commentRouter.post("/", createComment);
commentRouter.get("/:id", getComment);
commentRouter.put("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

module.exports = {
  commentRouter,
};
