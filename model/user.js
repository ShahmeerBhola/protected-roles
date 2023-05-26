const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 20,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
