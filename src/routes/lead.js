const express = require("express");

const { leadSubmit } = require("../controller/lead");

const router = express.Router();

router.post("/form/submit-lead", leadSubmit);

module.exports = router;
