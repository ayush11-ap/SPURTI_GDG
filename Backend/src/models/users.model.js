const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "First Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    mobileNo: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: [
        "Residential",
        "NGO",
        "Expert",
        "Donor",
        "volunteer",
        "Spurti Volunteer",
      ],
    },
    roleDetails: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

userSchema.methods.generateJWT = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
