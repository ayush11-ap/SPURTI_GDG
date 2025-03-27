const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    const { token } = cookies;
    if (!token) {
      throw new Error("Unauthorized User !!");
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const { _id } = decoded;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not Found !!");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Error in Authentication :" + error.message);
  }
};

module.exports = { userAuth };
