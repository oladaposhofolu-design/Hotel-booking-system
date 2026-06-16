const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// POST /api/payments/create-checkout-session
// User initiates payment for their booking
router.post("/create-checkout-session", verifyToken, async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId).populate("room");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Make sure this booking belongs to the logged-in user
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.paymentStatus === "Paid") {
      return res.status(400).json({ message: "Booking is already paid" });
    }

    const room = booking.room;

    // Calculate total price based on number of nights
    const checkIn = new Date(booking.checkInDate);
    const checkOut = new Date(booking.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights; // price in dollars

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${room.roomType} - Room ${room.roomNumber}`,
              description: `${nights} night(s) · Check-in: ${checkIn.toDateString()} · Check-out: ${checkOut.toDateString()}`,
            },
            unit_amount: Math.round(totalPrice * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`,
      cancel_url: `${process.env.CLIENT_URL}/my-bookings`,
      metadata: {
        bookingId: bookingId,
        userId: req.user.id,
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ message: "Failed to create payment session", error: err.message });
  }
});

// POST /api/payments/webhook
// Stripe calls this after payment is confirmed
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata.bookingId;

    try {
      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.paymentStatus = "Paid";
        booking.paymentReference = session.payment_intent;
        booking.status = "Approved";
        await booking.save();
        console.log(`Payment confirmed for booking ${bookingId}`);
      }
    } catch (err) {
      console.error("Failed to update booking after payment:", err);
    }
  }

  res.json({ received: true });
});

// GET /api/payments/verify/:sessionId
// Frontend calls this on the success page to confirm payment
router.get("/verify/:sessionId", verifyToken, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    if (session.payment_status === "paid") {
      const bookingId = session.metadata.bookingId;

      // Update booking in case webhook hasn't fired yet
      const booking = await Booking.findById(bookingId);
      if (booking && booking.paymentStatus !== "Paid") {
        booking.paymentStatus = "Paid";
        booking.paymentReference = session.payment_intent;
        booking.status = "Approved";
        await booking.save();
      }

      return res.json({ success: true, booking });
    }

    res.json({ success: false, message: "Payment not completed" });
  } catch (err) {
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
});

// GET /api/payments/all  (admin only)
router.get("/all", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const payments = await Booking.find({ paymentStatus: "Paid" })
      .populate("user", "name email")
      .populate("room", "roomType roomNumber price");

    res.json(payments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;