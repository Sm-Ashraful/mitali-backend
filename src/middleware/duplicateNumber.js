const path = require("path");
const fs = require("fs");

exports.validatePhoneNumber = (req, res, next) => {
  const { PhoneNumber } = req.body;
  console.log(req.body, PhoneNumber);
  const phoneNumberString = PhoneNumber.toString();
  if (!PhoneNumber) {
    return res.status(400).json({ error: "Phone number is required." });
  }

  const phoneFilePath = path.join(__dirname, "..", "lib", "notValid.json");
  const phoneData = JSON.parse(fs.readFileSync(phoneFilePath, "utf-8"));

  // Check if the phone number exists in the data
  const isPhoneNumberValid = phoneData.some(
    (entry) => entry.number.toString() === phoneNumberString
  );

  if (isPhoneNumberValid) {
    return res.status(400).json({ error: "It's bad request with this number" });
  }

  next(); // Move to the next middleware or controller
};
