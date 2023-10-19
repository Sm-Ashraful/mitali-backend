// routes/jobApplicationRoutes.js
const express = require("express");
const multer = require("multer"); // For handling file uploads
const { submitApplication } = require("../controller/jobApplication");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Define upload directory

router.post("/submit", upload.single("cv"), submitApplication);

module.exports = router;
