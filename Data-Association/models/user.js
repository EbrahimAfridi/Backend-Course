const mongoose = require("mongoose");

mongoose.connect("monogodb://127.0.0.1.27017/data-association-db");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  age: Number,
  post: [],
});

module.exports = mongoose.model("user", userSchema);
