const express = require("express");

const {
  signin,
  signup,
  signout,
  authenticateUser,
} = require("../controller/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/verified", authenticateUser);

module.exports = router;
