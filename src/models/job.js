const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: {
    type: String, // Change the type to String
  },
  jobName: String,
  category: String,
  vacancy: Number,
  jobContext: [String],
  jobResponsibilities: [String],
  jobType: String,
  education: [String],
  experience: [String],
  additionalRequirement: [String],
  workPlace: String,
  location: String,
  salary: [String],
  other: [String],
  howTo: String,
  status: {
    type: String,
    enum: ["active", "complete", "draft"], // Define the possible values
    default: "draft", // Set the default value
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
