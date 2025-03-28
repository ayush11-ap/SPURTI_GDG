const express = require("express");
const connectDB = require("./db/database");
const cors = require("cors");

const app = express();

const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const problemRouter = require("./routes/problem.routes");
const verifyRouter = require("./routes/verify.routes");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
require("dotenv").config();

//Middleware
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use("/user", userRouter);
app.use("/problem", problemRouter);
app.use("/verify", verifyRouter);

connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(1111, () => {
      console.log("Server is running on port 1111");
    });
  })
  .catch((err) => {
    console.log("Error in database connection");
    console.log(err);
  });
