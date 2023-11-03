const express = require("express");

const {
  createJob,
  getAllJobs,
  updateJobStatus,
  getActiveJobs,
} = require("../controller/job");

const router = express.Router();

router.post("/job", createJob);
router.get("/get-job", getAllJobs);
router.get("/get-active-job", getActiveJobs);
router.put("/update-job-status", updateJobStatus);

module.exports = router;
