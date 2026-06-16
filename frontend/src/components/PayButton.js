import { useState } from "react";
import axios from "axios";

function PayButton({ bookingId, paymentStatus }) {
  const [loading, setLoading] = useState(false);

  if (paymentStatus === "Paid") {
    return (
      <span style={{
        display: "inline-block",
        padding: "6px 14px",
        backgroundColor: "#d4edda",
        color: "#155724",
        borderRadius: "4px",
        fontWeight: "bold",
        fontSize: "14px"
      }}>
        ✅ Paid
      </span>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/payments/create-checkout-session`,
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      style={{
        padding: "8px 18px",
        backgroundColor: loading ? "#aaa" : "#635bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: "bold",
        fontSize: "14px"
      }}
    >
      {loading ? "Redirecting to Stripe..." : "💳 Pay Now"}
    </button>
  );
}

export default PayButton;