const { Post } = require("../models/posts");
const { ErrorResponse } = require("../utils/ErrorResponse");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate("author");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author comments");
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, description, image } = req.body;
    const author = req.user.id;
    const post = await Post.create({ title, description, image, author });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, image, author, isActive } = req.body;
    const post = await Post.findOneAndUpdate(
      id,
      {
        title,
        description,
        image,
        author,
        isActive,
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
