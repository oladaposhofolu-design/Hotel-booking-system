const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided."
    });
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    );

    req.user = verified;

    next();

  } catch (err) {
    console.log(err);

    return res.status(400).json({
      message: "Invalid token",
      error: err.message
    });
  }
};

module.exports = verifyToken;