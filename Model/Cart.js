const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.ObjectId, ///pass other schema as referance product
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  // user: {
  //   type: mongoose.Schema.ObjectId, ///pass other schema as referance
  //   ref: "User",
  // },
});
const Cart = mongoose.model("cart", cartSchema);
module.exports = { Cart };
