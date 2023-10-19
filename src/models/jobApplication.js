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
  // Add other fields as needed
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
