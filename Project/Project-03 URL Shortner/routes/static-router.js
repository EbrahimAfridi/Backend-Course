const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req, res, next) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", {
      urls: allUrls,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
