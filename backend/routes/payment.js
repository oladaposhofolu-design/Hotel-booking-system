const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const verifyToken = require("../middleware/authMiddleware");

router.put(
  "/pay/:id",
  verifyToken,
  async (req, res) => {
    try {

      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found"
        });
      }

      booking.paymentStatus = "Paid";
      booking.paymentReference =
        "PAY-" + Date.now();
        booking.status = "Approved";

      await booking.save();

      res.json({
        message: "Payment successful",
        booking
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;