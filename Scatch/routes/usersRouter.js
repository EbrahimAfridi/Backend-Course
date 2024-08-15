const express = require("express");
const router = express.Router();
const { registerUser, logInUser } = require("../controllers/authController");


router.get("/", (req, res) => {
  res.send("Users route");
});

router.post("/register", registerUser);
router.post("/login", logInUser);

module.exports = router;
