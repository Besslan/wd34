const express = require("express");

const { getProfile, getUsers, updateUser } = require("../controllers/users");
const { verifyToken } = require("../middlewares/verifyToken");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/profile", verifyToken, getProfile);
userRouter.put("/:id", verifyToken, updateUser);

module.exports = {
  userRouter,
};
