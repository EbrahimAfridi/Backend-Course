const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Users route");
});

router.post("/register", (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // encrypting password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        } else {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });

          // Token Generation
          const token = jwt.sign({ email, id: user._id }, "jwtSecret", {
            expiresIn: "1h",
          });
          res.cookie("token", token); // saving jwt token in cookie
          res.send("User registered succesfully.", token);
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
