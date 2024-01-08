const express = require("express");

const { leadSubmit, getLeadData } = require("../controller/lead");
const { validatePhoneNumber } = require("../middleware/duplicateNumber");

const router = express.Router();

router.post("/form/submit-lead", validatePhoneNumber, leadSubmit);
router.get("/form/get-lead", getLeadData);

module.exports = router;
