const express = require("express");

const { addUserForm, getUserForm } = require("../controller/form");

const router = express.Router();

router.post("/form", addUserForm);
router.get("/get-form", getUserForm);

module.exports = router;
