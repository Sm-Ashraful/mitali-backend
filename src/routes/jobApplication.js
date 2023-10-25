// routes/jobApplicationRoutes.js
const express = require("express");
const multer = require("multer"); // For handling file uploads
const path = require("path");
const shortid = require("shortid");
const {
  submitApplication,
  getAllApplication,
  updateApplication,
} = require("../controller/jobApplication");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage }); // Define upload directory

router.post("/submit", upload.single("cv"), submitApplication);
router.get("/get-application", getAllApplication);
router.put("/update-status", updateApplication);

module.exports = router;
