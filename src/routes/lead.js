const express = require("express");

const { leadSubmit, getLeadData } = require("../controller/lead");

const router = express.Router();

router.post("/form/submit-lead", leadSubmit);
router.get("/form/get-lead", getLeadData);

module.exports = router;
