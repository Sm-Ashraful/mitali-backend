const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    FirstName: String,
    LastName: String,
    PhoneNumber: {
      type: String,
      unique: false,
    },
    EmailAddress: {
      type: String,
      required: true,
      unique: false,
    },
    Address: {
      type: String,
    },

    State: String,
    City: String,
    ZipCode: String,
    DateOfBirth: String,
    TransactionId: String,
  },
  { timestamps: true }
);

const lead = new mongoose.model("Lead", schema);
module.exports = lead;
