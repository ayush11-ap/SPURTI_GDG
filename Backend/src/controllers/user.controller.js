const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/user.validate");
const validator = require("validator");
const User = require("../models/users.model");

// User Registration
module.exports.registerUser = async (req, res) => {
  try {
    validateSignUpData(req);

    const { name, email, password, mobileNo, role, address, roleDetails } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      mobileNo,
      password: hashedPassword,
      role,
      address,
      roleDetails,
    });
    await user.save();

    // Generate JWT token
    const token = await user.generateJWT();

    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    });

    res.json({
      message: "User Created Successfully",
      data: user,
      token,
    });
  } catch (error) {
    res.status(400).send("Error While Saving the user : " + error.message);
  }
};

// User Login
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Email or Password!");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.generateJWT();

      res.cookie("token", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
        expires: new Date(Date.now() + 8 * 3600000), // 8 hours
      });
      res.json({
        message: "User Logged In Successfully!",
        data: user,
        token,
      });
    } else {
      throw new Error("Invalid Password or Email");
    }
  } catch (error) {
    res.status(400).send("Error while saving the user : " + error.message);
  }
};

// User Profile
module.exports.getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User not found!");
    }
    res.json(user);
  } catch (error) {
    res.status(400).send("Error While Fetching the user:" + error.message);
  }
};

// User Profile Logout
module.exports.logoutUser = async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("User Logged Out Successfully!");
};
