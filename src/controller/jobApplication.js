const JobApplication = require("../models/jobApplication");

exports.submitApplication = async (req, res) => {
  const { name, phone, email } = req.body;
  const cv = req.file.path; // Assuming you're using multer to handle file uploads
  console.log("Body: ", req.body);
  console.log("File", req.file);
  try {
    const newJobApplication = new JobApplication({
      name,
      phone,
      email,
      cv,
    });
    console.log("newJobApplication", newJobApplication);
    await newJobApplication.save();
    res
      .status(201)
      .json({ message: "Job application submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getAllApplication = async (req, res) => {
  try {
    const jobsApplication = await JobApplication.find();
    res.status(200).json(jobsApplication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
