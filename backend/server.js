const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const authRoutes = require("./routes/auth");
const app = express();
const adminRoutes = require("./routes/admin");
const hotelRoutes = require("./routes/hotel");
const roomRoutes = require("./routes/room");
const bookingRoutes = require("./routes/booking");
const paymentRoutes = require("./routes/payment");

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/bookings", bookingRoutes);


// MongoDB connectionS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// server listen (YOU WERE MISSING THIS)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});