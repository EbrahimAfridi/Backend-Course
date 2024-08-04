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
    posts: ["post-1", "post-2"],
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postdata: "Hello dummy post data",
    user: "66af8f55f2832805453c972c",
  });

  let user = await userModel.findOne({ _id: "66af8f55f2832805453c972c" });
  user.posts.push(post._id);
  await user.save(); // saving manually because we did not used findOneAndUpdate
  res.send({ post, user });
});

app.listen(PORT);
