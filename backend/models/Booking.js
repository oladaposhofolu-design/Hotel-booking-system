const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },

  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  guests: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "Pending"
  },

  paymentStatus: {
  type: String,
  default: "Pending"
},

paymentReference: {
  type: String
}
}, { timestamps: true });


module.exports = mongoose.model("Booking", bookingSchema);