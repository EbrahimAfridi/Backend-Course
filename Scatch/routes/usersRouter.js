const express = require("express");
const router = express.Router();
const { registerUser, logInUser, logOutUser } = require("../controllers/authController");


router.get("/", (req, res) => {
  res.send("Users route");
});

router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/logout", logOutUser);

module.exports = router;
