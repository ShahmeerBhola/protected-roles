const express = require("express");
const { signUp, logIn, userProfile, userLogo } = require("../controllers/user");
const { SignUpValidation, LoginValidation } = require("../validations/user");
const { VerifyToken } = require("../middlewares/Token");
const { upload } = require("../middlewares/file-upload");
const router = express.Router();

router.post("/signup", SignUpValidation, signUp);
router.post("/login", LoginValidation, logIn);
router.get("/profile", VerifyToken, userProfile);
router.post("/upload", VerifyToken, upload.single("upload"), userLogo);

module.exports = router;
