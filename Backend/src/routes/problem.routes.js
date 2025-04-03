const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const {
  registerProblem,
  problemFeed,
  aiProblemAnalysis,
  toggleUpvote,
} = require("../controllers/problem.controller");
const upload = require("../middlewares/upload.middleware");

const problemRouter = express.Router();

problemRouter.post(
  "/submit",
  userAuth,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 2 },
    { name: "documents", maxCount: 3 },
  ]),
  registerProblem
);
problemRouter.get("/verifiedProblems", userAuth, problemFeed);
problemRouter.get("/aiAnalysis", userAuth, aiProblemAnalysis);
problemRouter.patch("/upvote/:problemId", userAuth, toggleUpvote);

module.exports = problemRouter;
