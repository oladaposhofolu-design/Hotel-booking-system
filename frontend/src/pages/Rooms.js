import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Available Rooms</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {rooms.map((room) => (
          <div
            key={room._id}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              margin: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              width: "300px",
            }}
          >
            <h3>{room.roomType}</h3>

            <p>
              <strong>Room Number:</strong> {room.roomNumber}
            </p>

            <p>
              <strong>Price:</strong> ₦{room.price}
            </p>

            <p>
              <strong>Capacity:</strong> {room.capacity} Guests
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {room.available ? "Available" : "Booked"}
            </p>

            <button onClick={() => navigate(`/book-room/${room._id}`)}>
              Book Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
