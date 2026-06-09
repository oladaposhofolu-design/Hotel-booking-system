const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  

  if (!authHeader) {
    return res.status(401).json({
      message: "Invalid authorization format."
    });
  }

  const token = authHeader.split(" ")[1];

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
      message: "Token missing",
      error: err.message
    });
  }
};

module.exports = verifyToken;