const express = require("express");
// const Cart = require("../Model/Cart");
const {
  cart,
  addCart,
  updateCart,
  payment,
} = require("../controllers/cart.controller");

const router = express.Router();

//task 1: add cart
router.post("/addcart", addCart);
//task 2: show cart
router.get("/usercarts", cart);
//task 3: update Cart
router.put("/updatecart", updateCart);
//task 4: payment
router.post("/payment", payment);

module.exports = router;
