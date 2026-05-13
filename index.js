require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");

const connectDB = require("./config/db");

connectDB();

app.use("/jobs", jobRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log("Server is started");
});