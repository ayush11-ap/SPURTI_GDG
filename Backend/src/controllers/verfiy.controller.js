const problemModel = require("../models/problem.model");
const User = require("../models/users.model");

module.exports.getAllProblems = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.role !== "Spurti Volunteer") {
      return res.status(403).json({ error: "Access denied" });
    }

    const problems = await problemModel
      .find()
      .populate("submittedBy", "name email");
    res.status(200).json({ problems });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching problems: " + error.message });
  }
};

module.exports.updateProblemStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user || user.role !== "Spurti Volunteer") {
      return res.status(403).json({ error: "Access denied" });
    }

    const { problemId, status } = req.body; // status: "approved" or "rejected"

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const problem = await problemModel.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    problem.verificationStatus = status;
    problem.verified = status === "approved";

    await problem.save();
    res
      .status(200)
      .json({ message: `Problem ${status} successfully`, problem });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating problem status: " + error.message });
  }
};
