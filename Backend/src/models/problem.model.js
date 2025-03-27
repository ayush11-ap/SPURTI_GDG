const mongoose = require("mongoose");
const validator = require("validator");

const ProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.split(" ").length <= 20; // Ensure title has at most 20 words
        },
        message: "Title must not exceed 20 words.",
      },
    },
    description: {
      type: String,
      required: true,
      minlength: 20, // Minimum length for description
      maxlength: 2000, // Maximum length for description
    },
    category: {
      type: String,
      enum: [
        "education",
        "healthcare",
        "infrastructure",
        "environment",
        "technology",
        "others",
      ],
      required: true,
    },
    images: {
      type: [String], // Cloud storage URLs
    },
    videos: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.every((url) =>
            url.startsWith("https://storage.googleapis.com/")
          );
        },
        message: "All videos must be valid Google Cloud Storage URLs.",
      },
    },

    documents: {
      type: [String],
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verified: { type: Boolean, default: false },
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    assignedExperts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    votes: { type: Number, default: 0, min: 0 },
    address: {
      type: String,
      required: true,
    },
    city: { type: String, default: "" }, // Extracted city
    urgencyLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    geminiReport: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", ProblemSchema);
