const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Room = require("../models/Room");

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

router.post(
  "/create",
  verifyToken,
  async (req, res) => {
    try {

      const room = await Room.findById(req.body.room);

      if (!room) {
        return res.status(404).json({
          message: "Room not found"
        });
      }

      if (!room.available) {
        return res.status(400).json({
          message: "Room not available"
        });
      }

      const booking = new Booking({
        user: req.user.id,
        room: req.body.room,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        guests: req.body.guests
      });

      await booking.save();

      room.available = false;
      await room.save();

      res.json({
        message: "Booking created successfully",
        booking
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get(
  "/my-bookings",
  verifyToken,
  async (req, res) => {
    try {

      const bookings = await Booking.find({
        user: req.user.id
      }).populate("room");

      res.json(bookings);

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get(
  "/all",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {

      const bookings = await Booking.find()
        .populate("user")
        .populate("room");

      res.json(bookings);

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put(
  "/approve/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {

      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found"
        });
      }

      booking.status = "Approved";

      await booking.save();

      res.json({
        message: "Booking approved",
        booking
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put(
  "/cancel/:id",
  verifyToken,
  async (req, res) => {
    try {

      const booking = await Booking.findById(req.params.id);

      if (!booking) {
        return res.status(404).json({
          message: "Booking not found"
        });
      }

      booking.status = "Cancelled";
      await booking.save();

      const room = await Room.findById(booking.room);

      if (room) {
        room.available = true;
        await room.save();
      }

      res.json({
        message: "Booking cancelled successfully",
        booking
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;