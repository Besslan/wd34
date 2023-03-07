const express = require("express");
const {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

const { verifyToken } = require("../middlewares/verifyToken");

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.post("/", verifyToken, createPost);
postRouter.get("/:id", getPost);
postRouter.put("/:id", verifyToken, updatePost);
postRouter.delete("/:id", verifyToken, deletePost);

module.exports = {
  postRouter,
};
