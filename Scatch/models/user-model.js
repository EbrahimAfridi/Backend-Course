const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  // cart: {
  //   type: Array,
  //   default: [],
  // },
  // orders: {
  //   type: Array,
  //   default: [],
  // },
  // contact: Number,
  // picture: String,
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
