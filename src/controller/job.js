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

    const job = new Job({
      ...jobData,
      jobId: uuid.v4(),
      jobContext,
      jobResponsibilities,
      education,
      experience,
      experience,
      additionalRequirement,
      salary,
      other,
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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
