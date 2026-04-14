const express = require("express");
const cors = require("cors")
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(",") : true,
    credentials: true
  })
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

module.exports = app;