const express = require("express");
const app = express();
const PORT = 3000;
const userModel = require("./models/user");
const postModel = require("./models/post");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  let { name, username, email, age, password } = req.body;

  // Check if user already exists
  let user = await userModel.findOne({ email: email });
  if (user) return res.status(500).send("User already exists");

  // If new user, hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        name,
        username,
        email,
        age,
        password: hash,
      });

      let token = jwt.sign({ email: email, userId: user._id }, "secretkey");
      res.cookie("jwtToken", token);
      res.send("User registered successfully");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  // Check if user already exists
  let user = await userModel.findOne({ email: email });
  if (!user) return res.status(500).send("Something went wrong");

  // Compare both passwords
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      res.status(200).send("User logged in successfully");
    } else {
      res.redirect("/login");
    }
  });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
