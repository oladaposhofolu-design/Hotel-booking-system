import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaSpinner } from "react-icons/fa";
import "./Rooms.css";

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
          token ? axios.get("https://hotel-booking-backend-ot49.onrender.com/api/bookings/my-bookings", {
            headers: { Authorization: `Bearer ${token}` },
          }) : Promise.resolve({ data: [] }),
        ]);

        setRooms(roomsRes.data);
        setBookings(bookingsRes.data);
      } catch (err) {
        setError("Failed to fetch rooms. Please try again later.");
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

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Loading rooms...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="rooms-container">
      <div className="rooms-header">
        <h1>Available Rooms</h1>
        <p>Browse and book your perfect hotel room</p>
      </div>

      <div className="container">
        <div className="search-section">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by room type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="no-results">
            <h3>No rooms found</h3>
            <p>Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="rooms-grid">
            {filteredRooms.map((room) => {
              const isBookedByUser = bookings.some(
                (booking) => booking.roomId === room._id
              );

              const bookingCount = bookings.filter(
                (booking) => booking.room && booking.room._id === room._id
              ).length;

              return (
                <div key={room._id} className="room-card">
                  <div className="room-image-container">
                    {room.image && (
                      <img
                        src={`https://hotel-booking-backend-ot49.onrender.com/uploads/${room.image}`}
                        alt={room.roomType}
                        className="room-image"
                      />
                    )}
                    <div className={`room-status ${room.available ? 'available' : 'booked'}`}>
                      {room.available ? '✅ Available' : '❌ Booked'}
                    </div>
                  </div>

                  <div className="room-info">
                    <h3>{room.roomType}</h3>
                    <p className="room-number"><strong>Room #:</strong> {room.roomNumber}</p>
                    <p className="room-capacity"><strong>Capacity:</strong> {room.capacity} Guests</p>
                    <p className="room-bookings"><strong>Bookings:</strong> {bookingCount}</p>
                    
                    <div className="room-price">
                      ₦{room.price?.toLocaleString()}/Night
                    </div>

                    <button
                      className={`book-btn ${!room.available || isBookedByUser ? 'disabled' : ''}`}
                      disabled={!room.available || isBookedByUser}
                      onClick={() => navigate(`/book-room/${room._id}`)}
                    >
                      {room.available
                        ? isBookedByUser
                          ? "Already Booked"
                          : "Book Now"
                        : "Unavailable"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;
