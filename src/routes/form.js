const express = require("express");

const { addUserForm, getUserForm, seenForm } = require("../controller/form");

const router = express.Router();

router.post("/form", addUserForm);
router.get("/get-form", getUserForm);
router.patch("/seen-form/:_id", seenForm);

module.exports = router;
