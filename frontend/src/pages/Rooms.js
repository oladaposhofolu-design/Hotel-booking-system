import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const [roomsRes, bookingsRes] = await Promise.all([
          axios.get("https://hotel-booking-backend-ot49.onrender.com/api/rooms"),
          axios.get("https://hotel-booking-backend-ot49.onrender.com/api/bookings/my-bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setRooms(roomsRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.roomType.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Step 13: Handle empty search results
  if (filteredRooms.length === 0) {
    return (
      <div className="container">
        <h2>No rooms found.</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search room type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", maxWidth: "300px" }}
      />

      <h2>Available Rooms</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredRooms.map((room) => {
          const isBookedByUser = bookings.some(
            (booking) => booking.roomId === room._id
          );

          // Step 12: Count bookings per room
          const bookingCount = bookings.filter(
            (booking) => booking.room && booking.room._id === room._id
          ).length;

          return (
            <div
              key={room._id}
             style={{
  background: "white",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 3px 12px rgba(0,0,0,0.1)",
  width: "300px"
}}
            >


              {room.image && (
  <img
    src={`https://hotel-booking-backend-ot49.onrender.com/uploads/${room.image}`}
    alt={room.roomType}
    style={{
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "10px",
      marginBottom: "10px"
    }}
  />
)}
              <h3>{room.roomType}</h3>
              <p><strong>Room Number:</strong> {room.roomNumber}</p>
              <p><strong>Price:</strong> ₦{room.price}</p>
              <p><strong>Capacity:</strong> {room.capacity} Guests</p>
              <p><strong>Status:</strong> {room.available ? "✅ Available" : "❌ Booked"}</p>
              <p><strong>Bookings:</strong> {bookingCount}</p>

              <button
                disabled={!room.available || isBookedByUser}
                onClick={() => navigate(`/book-room/${room._id}`)}
              >
                {room.available
                  ? isBookedByUser
                    ? "Already Booked"
                    : "Book Room"
                  : "Unavailable"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rooms;
