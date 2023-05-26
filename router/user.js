const express = require("express");
const { signUp } = require("../controllers/user");
const { SignUpValidation } = require("../validations/user");
const router = express.Router();

router.post("/signup", SignUpValidation, signUp);

module.exports = router;
