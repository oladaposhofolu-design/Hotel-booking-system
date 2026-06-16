import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | failed

  const sessionId = searchParams.get("session_id");

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

  useEffect(() => {
    if (!sessionId) {
      setStatus("failed");
      return;
    }
    verifyPayment();
  }, [sessionId]);

  // ...return JSX
}
