import { useEffect, useState } from "react";
import axios from "axios";
import PayButton from "../components/PayButton";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://hotel-booking-backend-ot49.onrender.com/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `https://hotel-booking-backend-ot49.onrender.com/api/bookings/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
      <h2>My Bookings</h2>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{booking.room.roomType}</h3>

          <p>Status: {booking.status}</p>

          <p>Guests: {booking.guests}</p>

          <p>Payment Status: {booking.paymentStatus}</p>

          <p>
            Check In: {new Date(booking.checkInDate).toLocaleDateString()}
          </p>

          <p>
            Check Out: {new Date(booking.checkOutDate).toLocaleDateString()}
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            {/* Show Pay Now button only if booking isn't cancelled */}
            {booking.status !== "Cancelled" && (
              <PayButton
                bookingId={booking._id}
                paymentStatus={booking.paymentStatus}
              />
            )}

            {/* Only allow cancel if not already cancelled or paid */}
            {booking.status !== "Cancelled" && booking.paymentStatus !== "Paid" && (
              <button onClick={() => cancelBooking(booking._id)}>
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      ))}

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

export default MyBookings;