const uuid = require("uuid");
const Job = require("../models/job");
exports.createJob = async (req, res) => {
  try {
    const jobData = req.body;
    const jobContext = req.body.jobContext || [];
    const jobResponsibilities = req.body.jobResponsibilities || [];
    const education = req.body.education || [];
    const experience = req.body.experience || [];
    const additionalRequirement = req.body.additionalRequirement || [];
    const salary = req.body.salary || [];
    const other = req.body.other || [];
    const deadline = req.body.deadline;

    const job = new Job({
      ...jobData,
      jobId: uuid.v4(),
      jobContext,
      jobResponsibilities,
      education,
      experience,
      additionalRequirement,
      salary,
      other,
      deadline,
    });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getActiveJobs = async (req, res) => {
  try {
    const activeJobs = await Job.find({ status: "active" });
    res.status(200).json(activeJobs);
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
  }
};
exports.updateJobStatus = async (req, res) => {
  try {
    const { jobId, status } = req.body;

    const updatedData = await Job.findOneAndUpdate(
      { jobId: jobId },
      { status: status },
      { new: true } // To get the updated document
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error while updating data", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
