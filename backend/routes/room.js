const express = require("express");
const router = express.Router();

const Room = require("../models/Room");

const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

router.post(
  "/create",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const room = new Room(req.body);

      await room.save();

      res.json({
        message: "Room created successfully",
        room
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();

    res.json(rooms);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {

      const room = await Room.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(room);

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {

      await Room.findByIdAndDelete(req.params.id);

      res.json({
        message: "Room deleted successfully"
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;