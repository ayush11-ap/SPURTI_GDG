const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/user.controller");
const { userAuth } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/profile", userAuth, getUserProfile);

userRouter.post("/logout", logoutUser);

module.exports = userRouter;
