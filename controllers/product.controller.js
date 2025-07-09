const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/User");
const { Product } = require("../Model/Product");

const product = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      message: "All Products",
      products: products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal Server Error",
    });
  }
};

//add product insert data

const addProduct = async (req, res) => {
  try {
    let { name, price, image, description, brand, stock } = req.body;

    let { token } = req.headers;

    let decodeToken = jwt.verify(token, "supersecret");
    let user = await User.findOne({ email: decodeToken.email });
    if (!name || !price || !image || !description || !brand || !stock) {
      return res.status(400).json({
        message: "Some fields are missing",
      });
    }
    const product = await Product.create({
      name,
      price,
      image,
      description,
      brand,
      stock,
      user: user._id,
    });
    return res.status(200).json({
      message: "Product created successfully",
      product: product,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      message: "internal server error",
    });
  }
};

//fin single
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        message: "id not found",
      });
    }
    let { token } = req.headers;
    const decodeToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodeToken.email });
    if (user) {
      const product = await Product.findById(id);
      if (!product) {
        res.status(400).json({
          message: "product not found",
        });
      }
      return res.status(200).json({
        message: "product found successfully",
        product: product,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image, description, brand, stock } = req.body;
    const { token } = req.headers;

    const decodeToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodeToken.email });

    let productUpdated = null;

    if (user) {
      productUpdated = await Product.findByIdAndUpdate(
        id,
        { name, price, description, image, stock, brand },
        { new: true }
      );
    }

    return res.status(200).json({
      message: "Product Updated Successfully",
      product: productUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { token } = req.headers;

    const decodeToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodeToken.email });
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }

    const productDeleted = await Product.findByIdAndDelete(id);
    if (!productDeleted)
      return res.status(404).json({
        message: "Product not found",
      });

    res.status(200).json({
      message: "Product deleted successfully",
      product: productDeleted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  product,
  addProduct,
  singleProduct,
  updateProduct,
  deleteProduct,
};
