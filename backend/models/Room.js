const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },

  roomType: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  capacity: {
    type: Number,
    required: true
  },

  available: {
    type: Boolean,
    default: true
  },

  image: {
    type: String
  }
});

module.exports = mongoose.model("Room", roomSchema);