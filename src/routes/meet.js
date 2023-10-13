const express = require("express");

const { meetInfo } = require("../controller/meet");

const router = express.Router();

router.post("/meet", meetInfo);

module.exports = router;
