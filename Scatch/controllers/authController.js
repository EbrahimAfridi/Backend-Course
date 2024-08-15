const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).send("User already exists");
    }
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
          let token = generateToken(user); // Token generation
          res.cookie("token", token); // saving jwt token in cookie
          res.send(token);
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports.logInUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    return res
      .status(401)
      .send("User not found, email or password is incorrect");
  }

  // compare password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.send(err.message);
    }
    let token = generateToken(user); // Token generation
    res.cookie("token", token); // saving jwt token in cookie
    res.send("You are logged in.");
  });
};
