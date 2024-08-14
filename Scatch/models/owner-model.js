const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  password: String,
  email: String,
  products: {
    type: Array,
    default: [],
  },
  gstNumber: String,
  picture: String,
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Owner", ownerSchema);
