const express = require("express");
const userModel = require("./userModel");
const app = express();

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  const createdUser = await userModel.create({
    name: "Sharjeel Afridi",
    username: "Shaj Don",
    email: "sharjeel8@gmail.com",
  });
  console.log("Hey from /create route.");
  res.send(createdUser);
});

app.get("/update", async (req, res) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { username: "Ebu Don" },
    { username: "Ebu Afridi" },
    { new: true }
  );
  console.log("Hey from /update route.");
  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  const users = await userModel.find();
  console.log("Hey from /read route.");
  res.send(users);
});

app.get("/delete", async (req, res) => {
  const deletedUsers = await userModel.findOneAndDelete({username: "Shaj Don"});
  console.log("Hey from /delete route.");
  res.send(deletedUsers);
});

app.listen(3000, () => console.log("Listining on port 3000"));
