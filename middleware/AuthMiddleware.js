const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
  try {
    // checking the user token
    const token = req.headers.authorization?.split(" ")[1];
    console.log("JWT token by user", token);
    if (!token) {
      return res.status(401).json({ message: "No token found Unauthorized" });
    }

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    // verifying the user token
    const verifyToken = jwt.verify(token, JWT_SECRET_KEY);
    req.user = verifyToken;
    console.log("Token Decoded/Verified ", verifyToken);
    next();
  } catch (error) {
    console.error("Error in validating user (auth middle) ", error);
    res.status(400).json({ message: "Error in validating user" });
  }
};

module.exports = AuthMiddleware;
