const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./model/user");

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();
  res.render("read", { users: allUsers });
});

app.post("/create", async (req, res) => {
  let { name, email, imageUrl } = req.body;

  let createUser = await userModel.create({
    name: name,
    email: email,
    imageUrl: imageUrl,
  });

  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  let user = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
  let { name, email, imageUrl } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.id }, 
    { name: name, email: email, imageUrl: imageUrl },
    { new: true }
  );
  res.redirect("/read");
});

// Listner
app.listen(3000);
