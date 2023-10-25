require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// route import
const formRoute = require("./src/routes/form");
const meetRoute = require("./src/routes/meet");
const jobApplicationRoute = require("./src/routes/jobApplication");
const jobRoute = require("./src/routes/job");
const path = require("path");
//mongoose connect

const mongoString = process.env.db_url;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database connected");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "src", "uploads")));
app.use("/api", formRoute);
app.use("/api", meetRoute);
app.use("/api", jobApplicationRoute);
app.use("/api", jobRoute);

app.listen(8080, () => {
  console.log(`Server Started at ${8080}`);
});
