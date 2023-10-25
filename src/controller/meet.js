const meetModel = require("../models/meet");

exports.meetInfo = async (req, res) => {
  const { date, time, timeZone, fname, phone, email, topic } = req.body;
  const meetObj = {
    date: date,
    email: email,
    time: time,
    timeZone: timeZone,
    fname: fname,
    phone: phone,
    topic: topic,
  };

  if (req.body.guestEmail) {
    meetObj.guestEmail = req.body.guestEmail;
  }

  const _newMeet = new meetModel(meetObj);

  _newMeet
    .save()
    .then((meet) => {
      return res.status(201).json({
        message:
          "Meeting Created Successfully. We will send you details on your mail! Thank you",
      });
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ message: "Sorry, Something is wrong. Try again!" });
    });
};
exports.getAllMeetingDetails = async (req, res) => {
  meetModel
    .find({})
    .then((meet) => {
      return res.status(201).json({ meet });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
exports.completeMeet = async (req, res) => {
  const { _id } = req.params;

  try {
    const task = await meetModel.findById(_id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Mark the task as seen
    task.isSeen = true;
    await task.save();

    return res.status(200).json({ message: "Task marked as seen" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
