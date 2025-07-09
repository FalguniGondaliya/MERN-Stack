const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/User");
const { Product } = require("../Model/Product");
const { Cart } = require("../Model/Cart");
const Stripe = require('stripe');


const { product } = require("./product.controller");



const sendEmail = require("../utils/userEmail");

//task : 1 show cart

const cart = async (req, res) => {
  try {
    const { token } = req.headers;
    const decodeToken = jwt.verify(token, "supersecret");

    const user = await User.findOne({ email: decodeToken.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userCart = await Cart.findOne({ user: user._id }).populate({
      path: "products.product",
      model: "Product",
    });

    return res.status(200).json({
      message: "Cart fetched successfully",
      cart: userCart,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Internal Server Error" });
  }
};

// task : 2 add cart

const addCart = async (req, res) => {
  try {
    const { quantity, productID } = req.body;

    if (!quantity || !productID) {
      return res.status(400).json({
        message: "Some fields are missing",
      });
    }

    const { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");

    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart;
    let exists = false;

    if (user.cart) {
      cart = await Cart.findById(user.cart);
      if (!cart) {
        cart = await Cart.create({
          products: [{ product: productID, quantity }],
          total: product.price * quantity,
        });
        user.cart = cart._id;
        await user.save();
      } else {
        exists = cart.products.some(
          (p) => p.product.toString() === productID.toString()
        );

        if (exists) {
          return res.status(409).json({
            message: "Product already in cart. Go to Cart.",
          });
        }

        cart.products.push({ product: productID, quantity });
        cart.total += product.price * quantity;
        await cart.save();
      }
    } else {
      const newCart = await Cart.create({
        products: [{ product: productID, quantity }],
        total: product.price * quantity,
      });

      user.cart = newCart._id;
      await user.save();
    }

    return res.status(200).json({
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.error(error); // Add this for debugging
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//task : 3 update cart
// Update quantity or remove product from cart
const updateCart = async (req, res) => {
  try {
    const { productId, action } = req.body;
    const { token } = req.headers;

    const decoded = jwt.verify(token, "supersecret");

    const user = await User.findOne({ email: decoded.email }).populate({
      path: "cart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });

    if (!user || !user.cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cart = user.cart;

    const item = cart.products.find(
      (p) => p.product._id.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const price = item.product.price;

    if (action === "increase") {
      item.quantity += 1;
      cart.total += price;
    } else if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
        cart.total -= price;
      } else {
        cart.total -= price;
        cart.products = cart.products.filter(
          (p) => p.product._id.toString() !== productId
        );
      }
    } else if (action === "remove") {
      cart.total -= price * item.quantity;
      cart.products = cart.products.filter(
        (p) => p.product._id.toString() !== productId
      );
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const payment = async (req, res) => {
  try {
    const { token } = req.headers;
    const decodedToken = jwt.verify(token, "supersecret");
    const user = await User.findOne({ email: decodedToken.email }).populate({
      path: "cart",
      populate: {
        path: "products.product",
        model: "Product",
      },
    });
    console.log(user);

    if (!user || !user.cart || user.cart.products.length === 0) {
      return res.status(404).json({
        message: "User or cart not found",
      });
    }
    //payment code standard code
    //in line item user product and cart information
    const lineItems = user.cart.products.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });
    const currentUrl = process.env.CLIENT_URL;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${currentUrl}/success`,
      cancel_url: `${currentUrl}/cancel`,
    });
    //sned email to
    await sendEmail(
      user.email,
      user.cart.products.map((item) => ({
        Name: item.product.name,
        Price: item.product.price,
      }))
    );

    //card empty total 0
    user.cart.products = [];
    user.cart.total = 0;
    await user.cart.save();
    res.status(200).json({
      message: "get the payment url",
      url: session.url,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  cart,
  addCart,
  updateCart,
  payment,
};
