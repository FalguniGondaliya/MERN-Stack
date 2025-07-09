const express = require("express");
const router = express.Router();
const userRoute = require("./user");
const cartRoute = require("./cart");
const productRoute = require("./product");

router.use("/user", userRoute);
router.use("/product", productRoute);
router.use("/usercart", cartRoute);


module.exports = router;
