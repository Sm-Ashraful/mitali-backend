const express = require("express");

const { createJob, getAllJobs } = require("../controller/job");

const router = express.Router();

router.post("/job", createJob);
router.get("/get-job", getAllJobs);

module.exports = router;
