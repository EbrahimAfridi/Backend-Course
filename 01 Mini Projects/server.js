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

// Protect routes
function isLoggedIn(req, res, next) {
  if (req.cookies.jwtToken === "") {
    res.redirect("/login");
  } else {
    let data = jwt.verify(req.cookies.jwtToken, "secretkey");
    req.user = data;
  }
  next();
}

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.cookie("jwtToken", "");
  res.redirect("/");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ userId: req.user._id })
    .populate("posts");
  console.log(user);
  res.render("profile", { user: user });
});

app.get("/likes/:id", isLoggedIn, async (req, res) => {
  try {
    let post = await postModel.findOne({ _id: req.params.id }).populate("user");
    console.log("hi", post);
    if (post.likes.indexOf(req.user.userId) === -1) {
      post.likes.push(req.user.userId);
    } else {
      post.likes.splice(post.likes.indexOf(req.user.userId), 1);
    }
    await post.save();
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
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

      let token = jwt.sign({ email: email, userId: user.userId }, "secretkey");
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
      let token = jwt.sign({ email: email, userId: user._id }, "secretkey");
      res.cookie("jwtToken", token);
      // res.status(200).send("User logged in successfully");
      res.redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ userId: req.user._id }); // fetching user from db
  let post = await postModel.create({
    username: user._id,
    content: req.body.content,
  });
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
