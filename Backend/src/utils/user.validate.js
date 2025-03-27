const validator = require("validator");

const validateSignUpData = (req) => {
  const { name, email, mobileNo, password, address, role } = req.body;
  if (!name) {
    throw new Error("Name is required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isMobilePhone(mobileNo)) {
    throw new Error("Mobile Number be atleast 10 Digit");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    );
  }
};

module.exports = { validateSignUpData };
