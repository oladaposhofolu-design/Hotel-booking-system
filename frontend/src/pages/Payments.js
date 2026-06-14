import { useEffect, useState } from "react";
import axios from "axios";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/payments/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPayments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Payments</h2>

      {payments.map((payment) => (
        <div
          key={payment._id}
          className="card"
        >
          <p>
            Room:
            {" "}
            {payment.room?.roomType}
          </p>

          <p>
            User:
            {" "}
            {payment.user?.email}
          </p>

          <p>
            Payment Status:
            {" "}
            {payment.paymentStatus}
          </p>

          <p>
            Reference:
            {" "}
            {payment.paymentReference}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Payments;