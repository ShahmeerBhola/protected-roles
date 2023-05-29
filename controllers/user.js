const bcrypt = require("bcrypt");
const User = require("../model/user");
const { checkValidation } = require("../utils");
const { GenerateToken } = require("../middlewares/Token");
const mongoose = require("mongoose");

const signUp = async (req, res) => {
  const newUser = new User(req.body);
  let error = checkValidation(req);
  if (error) {
    res.status(400).json({ message: error });
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ message: "Email Already Exists" });
    } else {
      try {
        const hashPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashPassword;
        await newUser.save();
        res
          .status(201)
          .json({ message: "user created successfully", success: true });
      } catch (err) {
        return res.status(400).json({ message: "Password Not Valid" });
      }
    }
  }
};
const logIn = async (req, res) => {
  const error = checkValidation(req);
  console.log("Login", error);
  if (error) {
    return res.status(400).json({ message: error });
  } else {
    const loginUser = await User.findOne({ email: req.body.email });
    if (!loginUser) {
      return res.status(400).json({ message: "Email Not Found" });
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        loginUser.password
      );
      if (!validPassword) {
        return res.status(400).json({ message: "Password Invalid" });
      } else {
        GenerateToken(loginUser, res);
      }
    }
  }
};
const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    } else {
      user.password = undefined;
      return res.status(200).json({ user });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const userLogo = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    } else {
      user.avatar = req.file.path;
      await user.save();
      user.password = undefined;
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
module.exports = { signUp, logIn, userProfile, userLogo };
