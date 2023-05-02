const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Social Media App");
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error while connecting to DB", error);
  }
});
