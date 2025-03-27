const express = require("express");
const verifySpurtiVolunteer = require("../middlewares/verify.middleware");
const problemModel = require("../models/problem.model");
const {
  getAllProblems,
  updateProblemStatus,
} = require("../controllers/verfiy.controller");
const { userAuth } = require("../middlewares/auth.middleware");

const verifyRouter = express.Router();

verifyRouter.get("/allProblems", userAuth, getAllProblems);
verifyRouter.put("/updateStatus", userAuth, updateProblemStatus);

module.exports = verifyRouter;
