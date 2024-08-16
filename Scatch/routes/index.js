const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();

const products = [
  {
    name: "Laptop",
    price: 1000,
    img: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Mouse",
    price: 20,
    img: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Keyboard",
    price: 50,
    img: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Monitor",
    price: 200,
    img: "https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
  },
];

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("shop", { products });
});

router.get("/logout", isLoggedIn, (req, res) => {
  res.render("logout", { products });
});

module.exports = router;
