const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "user",
  },
  token: {
    type: String,
    require: true,
  },
  cart: {
    type: mongoose.Schema.ObjectId,
    ref: "cart",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
