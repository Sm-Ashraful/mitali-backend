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
