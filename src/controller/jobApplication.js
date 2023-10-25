const JobApplication = require("../models/jobApplication");
const nodemailer = require("nodemailer");

exports.submitApplication = async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    const newJobApplication = new JobApplication({
      name,
      phone,
      email,
    });
    if (req.file) {
      newJobApplication.cv = process.env.API + "/public/" + req.file.filename;
    }
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
const transporter = nodemailer.createTransport({
  service: "Gmail", // e.g., 'Gmail'
  auth: {
    user: "smashraful.dev@gmail.com",
    pass: "hnxz pnad jknk ptac",
  },
});
exports.updateApplication = async (req, res) => {
  try {
    // Assuming you have a data model, update the 'type' property
    // The data to be updated is expected in the request body
    const { _id, status, email, phone } = req.body;

    // Perform the update operation in your data model (e.g., using Mongoose)
    // Replace 'YourModel' with the actual model you are using
    const updatedData = await JobApplication.findOneAndUpdate(
      { _id: _id },
      { status: status },
      { new: true } // To get the updated document
    );

    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    // Send an email
    const emailMessage = {
      from: "mitalidigital2023@gmail.com",
      to: email,
      subject: "Interview at M/S Mitali International",
      text: `Dear Sir,

Congratulations, you have been selected for an interview at Mitali International.

We look forward to meeting with you.

Best regards,
Mitali International`,
    };

    transporter.sendMail(emailMessage, (error, info) => {
      if (error) {
        console.error("Error sending email", error);
        // Handle the email sending error
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error while updating data", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
