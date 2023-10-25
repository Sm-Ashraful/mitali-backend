const formModel = require("../models/form");

exports.addUserForm = async (req, res) => {
  const { email, message } = req.body;

  const formObj = {
    email: email,
    message: message,
  };
  if (req.body.name) {
    formObj.name = req.body.name;
  }
  if (req.body.phone) {
    formObj.phone = req.body.phone;
  }
  if (req.body.company) {
    formObj.company = req.body.company;
  }
  if (req.body.category) {
    formObj.category = req.body.category;
  }

  const _newForm = new formModel(formObj);

  _newForm
    .save()
    .then((form) => {
      return res
        .status(201)
        .json({ message: "Your Message was sent Successfully! Thank you" });
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ message: "Sorry, Something is wrong. Try again!" });
    });
};
exports.getUserForm = async (req, res) => {
  formModel
    .find({})
    .then((form) => {
      return res.status(201).json({ form });
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};
exports.seenForm = async (req, res) => {
  const { _id } = req.params;

  try {
    const task = await formModel.findById(_id);
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
