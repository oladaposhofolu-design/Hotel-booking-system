import { useEffect, useState } from "react";
import axios from "axios";
import DashboardChart from "../components/DashboardChart";
import RevenueChart from "../components/RevenueChart";

function AdminDashboard() {
  const [roomCount, setRoomCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [
          roomsRes,
          bookingsRes,
          paymentsRes,
          usersRes
        ] = await Promise.all([
          axios.get("https://hotel-booking-backend-ot49.onrender.com/api/rooms"),

          axios.get(
            "https://hotel-booking-backend-ot49.onrender.com/api/bookings/all",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),

          axios.get(
            "https://hotel-booking-backend-ot49.onrender.com/api/payments/all",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ),

          axios.get(
            "https://hotel-booking-backend-ot49.onrender.com/api/users/all",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
        ]);

        setRoomCount(roomsRes.data.length);
        setBookingCount(bookingsRes.data.length);
        setPaymentCount(paymentsRes.data.length);
        setUserCount(usersRes.data.length);
        setBookings(bookingsRes.data);

        const totalRevenue =
          paymentsRes.data.reduce(
            (sum, payment) =>
              sum + payment.amount,
            0
          );

        setRevenue(totalRevenue);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap"
        }}
      >
       <div className="card">
  <h3>Rooms</h3>
  <p style={{ color: "#2563eb" }}>{roomCount}</p>
</div>

<div className="card">
  <h3>Bookings</h3>
  <p style={{ color: "#f59e0b" }}>{bookingCount}</p>
</div>

<div className="card">
  <h3>Payments</h3>
  <p style={{ color: "#10b981" }}>{paymentCount}</p>
</div>

<div className="card">
  <h3>Users</h3>
  <p style={{ color: "#8b5cf6" }}>{userCount}</p>
</div>

       <div className="card">
  <h3>Revenue</h3>
  <p
    style={{
      color: "green",
      fontWeight: "bold",
      fontSize: "20px"
    }}
  >
    ₦{revenue}
  </p>
</div>
      </div>

      <DashboardChart
        roomCount={roomCount}
        bookingCount={bookingCount}
        paymentCount={paymentCount}
        userCount={userCount}
      />

      <RevenueChart
        revenue={revenue}
        bookings={bookingCount}
      />

      <h3>Recent Bookings</h3>

      {bookings.slice(0, 5).map((booking) => (
        <div key={booking._id}>
          <p>
            {booking.room?.roomType}
            {" - "}
            {booking.status}
          </p>
        </div>
      ))}

     <div
  style={{
    marginTop: "20px",
    display: "flex",
    gap: "10px"
  }}
>
  <button
    onClick={() => window.location.href="/create-room"}
  >
    Add New Room
  </button>

  <button
    onClick={() => window.location.href="/admin-bookings"}
  >
    Manage Bookings
  </button>

  <button
  onClick={() => window.location.href="/users"}
>
  View Users
</button>

<button
  onClick={() => window.location.href="/payments"}
>
  View Payments
</button>
</div>
    </div>
  );
}

export default AdminDashboard;