const express = require("express");
const router = express.Router();

const Hotel = require("../models/Hotel");

const verifyToken = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", async (req, res) => {

  try {

    const hotel = await Hotel.findOne();

    res.json(hotel);

  } catch (err) {

    res.status(500).json(err);

  }

});

router.post(
  "/create",
  verifyToken,
  adminMiddleware,
  async (req, res) => {

    try {

      const hotel = new Hotel(req.body);

      await hotel.save();

      res.json({
        message: "Hotel created successfully",
        hotel
      });

    } catch (err) {

      res.status(500).json(err);

    }

  }
);

router.put(
  "/update/:id",
  verifyToken,
  adminMiddleware,
  async (req, res) => {

    try {

      const hotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.json(hotel);

    } catch (err) {

      res.status(500).json(err);

    }

  }
);

module.exports = router;