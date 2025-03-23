const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("🔍 Checking Authorization Header:", authHeader); // ✅ Debugging Log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extract the token after "Bearer"

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    console.log("✅ Token Verified, User:", verified); // ✅ Debugging Log
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error.message);
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
