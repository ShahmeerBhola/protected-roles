const bcrypt = require("bcrypt");
const User = require("../model/user");
const { checkValidation } = require("../utils");

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
module.exports = { signUp };
