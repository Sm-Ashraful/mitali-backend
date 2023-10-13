const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: String,
    phone: {
      type: String,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    category: {
      type: String,
      unique: false,
    },
    isSeen: {
      type: Boolean,
      default: false, // Default to "not seen"
    },
    company: String,
    message: String,
  },
  { timestamps: true }
);

const form = new mongoose.model("Form", schema);
module.exports = form;
