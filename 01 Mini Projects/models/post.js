const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  // stores users ID, date of post created at and likes count.
  username: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: String,
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = mongoose.model("post", postSchema);
