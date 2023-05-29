const jwt = require("jsonwebtoken");
exports.GenerateToken = async (user, res) => {
  const generateToken = await jwt.sign(
    { id: user._id },
    process.env.JWT_TOKEN,
    {
      expiresIn: "12h",
    }
  );
  return res.status(200).json({ token: generateToken });
};
exports.VerifyToken = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    const decode = await jwt.verify(token, process.env.JWT_TOKEN);
    console.log("Verify token", decode);
    req.user = decode.id;
    next();
  }
};
