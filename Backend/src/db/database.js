const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI ||
      "mongodb+srv://ayush11:Ayush1105@projects.aqep8.mongodb.net/spurtiRAS"
  );
};

module.exports = connectDB;
