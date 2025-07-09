const { User } = require("../Model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    //check data empty or not
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        message: "some fields are missing",
      });
    }
    const isUserAlreadyExist = await User.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    //hash the password
    //no one can decode the password

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);
    //hyaddress stored token login time
    //stored time database
    //jwt token
    const token = jwt.sign({ email }, "supersecret", { expiresIn: "365d" });

    //create user in database
    await User.create({
      name,
      email,
      password: passwordHashed,
      token,
      role: "user",
    });
    res.status(202).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(505).json({
      message: "internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "some fields are missing",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "User not Resgister",
      });
    }

    //compare password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({
        message: "wrong password",
      });
    }
    res.status(200).json({
      message: "user login successfully",
      id: user._id,
      name: user.name,
      token: user.token,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log(error);

    res.status(505).json({
      message: "internal server error",
    });
  }
};

module.exports = { signup, login };
