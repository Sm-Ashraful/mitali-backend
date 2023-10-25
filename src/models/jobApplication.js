const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: String,
  email: {
    type: String,
    required: true,
  },
  cv: {
    type: String, // Store the file path in MongoDB
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "complete", "selected"], // Define the possible values
    default: "new", // Set the default value
  },
  // Add other fields as needed
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
