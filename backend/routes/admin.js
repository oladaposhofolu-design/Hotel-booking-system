const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get(
  "/dashboard",
  verifyToken,
  adminMiddleware,
  (req, res) => {

    res.json({
      message: "Welcome Admin"
    });

  }
);

module.exports = router;