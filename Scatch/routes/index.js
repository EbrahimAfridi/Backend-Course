const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.send("shop");
});

module.exports = router;
