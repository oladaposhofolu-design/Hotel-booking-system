import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [roomCount, setRoomCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  useEffect(() => {
    fetchRooms();
    fetchBookings();
    fetchPayments();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRoomCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookingCount(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const paidBookings = res.data.filter(
        (booking) => booking.paymentStatus === "Paid"
      );

      setPaymentCount(paidBookings.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div  className="container">
     <h1>🏨 Hotel Booking Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
         style={{
  background: "white",
  padding: "20px",
  width: "220px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
}}
        >
          <h3>Total Rooms</h3>
          <h2>{roomCount}</h2>
        </div>

        <div
          style={{
  background: "white",
  padding: "20px",
  width: "220px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
}}
        >
          <h3>Bookings</h3>
          <h2>{bookingCount}</h2>
        </div>

        <div
          style={{
  background: "white",
  padding: "20px",
  width: "220px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
}}
        >
          <h3>Payments</h3>
          <h2>{paymentCount}</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
