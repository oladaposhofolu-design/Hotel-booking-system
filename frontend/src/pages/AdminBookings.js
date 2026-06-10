import { useEffect, useState } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const approveBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/bookings/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      fetchBookings();
    } catch (err) {
      console.log(err);
      alert("Approval failed");
    }
  };

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);
      fetchBookings();
    } catch (err) {
      console.log(err);
      alert("Cancellation failed");
    }
  };

  return (
    <div>
      <h2>Admin Bookings</h2>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{booking.room.roomType}</h3>
          <p>User: {booking.user.email}</p>
          <p>Status: {booking.status}</p>
          <p>Guests: {booking.guests}</p>
          <p>Payment Status: {booking.paymentStatus}</p>
<div>
  <button
    onClick={() => approveBooking(booking._id)}
  >
    Approve
  </button>

  <button
    onClick={() => cancelBooking(booking._id)}
  >
    Cancel
  </button>
</div>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;
