const { check } = require("express-validator");
exports.SignUpValidation = [
  check("username").notEmpty().withMessage("Please provide your username"),
  check("email").notEmpty().withMessage("Please provide your email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
