const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgColor: String,
  panelColor: String,
  textColor: String,
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
