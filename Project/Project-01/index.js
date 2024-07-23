const express = require("express");
const app = express();
const path = require("path");

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Route
app.get("/", function(req, res) {
  res.render("index");
});

// Dynamic Route
app.get("/profile/:username", function(req, res) {
  const name = req.params.username;
  res.send(`Profile: ${name}`);
});
app.get("/author/:username/:age", function(req, res) {
  const name = req.params.username;
  const age = req.params.age;
  res.send(`Profile: ${name} is ${age} years old.`);
});

app.listen(3000, function() {
  console.log("Server running on port: 3000");
});