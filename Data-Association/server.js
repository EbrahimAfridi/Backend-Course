const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const PORT = 3000;

app.get("/", async (req, res) => {
  res.send("Hey");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "Ebrahim",
    email: "afridieb3@ck.com",
    age: 24,
    post: ["post-1", "post-2"],
  });
  res.send(user);
});

app.listen(PORT);
