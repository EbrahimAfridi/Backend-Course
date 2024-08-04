const mongoose = require("mongoose");

mongoose.connect("monogodb://127.0.0.1.27017/data-association-db");

const postSchema = mongoose.Schema({
  postdata: String,
  user: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", postSchema);
