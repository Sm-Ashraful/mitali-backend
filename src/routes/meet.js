const express = require("express");

const {
  meetInfo,
  getAllMeetingDetails,
  completeMeet,
} = require("../controller/meet");

const router = express.Router();

router.post("/meet", meetInfo);
router.get("/get-meeting-data", getAllMeetingDetails);
router.patch("/complete-meet/:_id", completeMeet);

module.exports = router;
