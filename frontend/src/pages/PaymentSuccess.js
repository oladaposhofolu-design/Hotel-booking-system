import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setStatus("failed");
      return;
    }

    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL || "https://hotel-booking-backend-ot49.onrender.com"}/api/payments/verify/${sessionId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatus(res.data.success ? "success" : "failed");
      } catch (err) {
        console.error(err);
        setStatus("failed");
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div style={{
      maxWidth: "500px",
      margin: "80px auto",
      textAlign: "center",
      padding: "40px",
      border: "1px solid #eee",
      borderRadius: "12px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)"
    }}>
      {status === "verifying" && (
        <>
          <div style={{ fontSize: "48px" }}>⏳</div>
          <h2>Verifying your payment...</h2>
          <p style={{ color: "#666" }}>Please wait a moment.</p>
        </>
      )}

      {status === "success" && (
        <>
          <div style={{ fontSize: "64px" }}>✅</div>
          <h2 style={{ color: "#155724" }}>Payment Successful!</h2>
          <p style={{ color: "#555" }}>
            Your booking has been confirmed and paid. You'll find it in your bookings.
          </p>
          <Link
            to="/my-bookings"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 24px",
              backgroundColor: "#635bff",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            View My Bookings
          </Link>
        </>
      )}

      {status === "failed" && (
        <>
          <div style={{ fontSize: "64px" }}>❌</div>
          <h2 style={{ color: "#721c24" }}>Payment Verification Failed</h2>
          <p style={{ color: "#555" }}>
            Something went wrong verifying your payment. If you were charged, please contact support.
          </p>
          <Link
            to="/my-bookings"
            style={{
              display: "inline-block",
              marginTop: "20px",
              padding: "10px 24px",
              backgroundColor: "#635bff",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Go to My Bookings
          </Link>
        </>
      )}
    </div>
  );
}

export default PaymentSuccess;