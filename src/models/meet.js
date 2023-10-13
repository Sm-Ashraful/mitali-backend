const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    date: String,
    time: String,
    timeZone: String,
    fname: String,
    phone: String,
    email: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
    },
    isSeen: {
      type: Boolean,
      default: false, // Default to "not seen"
    },
    guestEmail: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const meet = new mongoose.model("Meet", schema);
module.exports = meet;
