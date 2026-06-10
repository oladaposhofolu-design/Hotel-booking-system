import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/bookings/my-bookings",
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
      `http://localhost:5000/api/bookings/cancel/${id}`,
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

          <p>
            Payment Status:
            {booking.paymentStatus}
          </p>

          <p>
            Check In:
            {new Date(
              booking.checkInDate
            ).toLocaleDateString()}
          </p>

          <p>
            Check Out:
            {new Date(
              booking.checkOutDate
            ).toLocaleDateString()}
          </p>
          <button onClick={() => cancelBooking(booking._id)}> Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;