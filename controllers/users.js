const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorResponse } = require("../utils/ErrorResponse");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) throw new ErrorResponse("User already exists", 400);

    const hash = await bcrypt.hash(password, 5);

    const newUser = await User.create({ email, password: hash });

    const payload = { id: newUser._id, email: newUser.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8,
      })
      .json(payload);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      throw new ErrorResponse("No account connected with that email", 404);

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new ErrorResponse("Wrong password", 401);

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8,
      })
      .json(payload);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res
    .cookie("access_token", "", {
      httpOnly: true,
      maxAge: 0,
    })
    .send("ok");
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { email, id } = req.user;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, name, profilePic } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { email, name, profilePic },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  getUsers,
  getProfile,
  updateUser,
};
