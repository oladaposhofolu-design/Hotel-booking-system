const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  amenities: [
    {
      type: String
    }
  ],

  image: {
    type: String
  }
});

module.exports = mongoose.model("Hotel", hotelSchema);