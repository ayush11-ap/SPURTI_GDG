const User = require("../models/users.model");

const verifySpurtiVolunteer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.role !== "Spurti Volunteer") {
      return res
        .status(403)
        .json({ message: "Access denied, not authorized." });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = verifySpurtiVolunteer;
