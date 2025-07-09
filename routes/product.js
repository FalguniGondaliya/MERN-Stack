const express = require("express");
const { Product } = require("../Model/Product");

const {
  product,
  addProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const router = express.Router();

//task one see all the product
router.get("/products", product);

//task 2 add product
router.post("/add-product", addProduct);

//single product
router.get("/singleproduct/:id", singleProduct);

// update product
router.put("/update/:id", updateProduct);

//delete product
router.delete("/delete/:id", deleteProduct);

module.exports = router;
