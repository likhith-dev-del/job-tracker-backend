require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const jobRoutes = require("./routes/jobRoutes");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");


app.use(express.json()); // middle ware

app.use("/jobs", jobRoutes);

app.get("/" , (req, res) =>{

    res.send("Server running");
});

app.listen(5000, () =>{

    console.log("Server is started");
});
 
app.use("/auth", authRoutes);

connectDB();

