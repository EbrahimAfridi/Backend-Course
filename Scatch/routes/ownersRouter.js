const express = require("express");
const router = express.Router();
const OwnerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await OwnerModel.find();
    if (owners.length > 0) {
      return res.send(503).send("Owner already exists.");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await OwnerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

router.get("/", (req, res) => {
  res.send("Owners route.");
});


module.exports = router;
