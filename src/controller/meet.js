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
