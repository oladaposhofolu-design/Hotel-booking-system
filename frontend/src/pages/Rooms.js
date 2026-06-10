import { useEffect, useState } from "react";
import axios from "axios";

function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/rooms"
      );

      setRooms(res.data);

    } catch (err) {
      console.log(err);
    }
  };
  const bookRoom = async (roomId) => {
  try {
    const token = localStorage.getItem("token");

    const bookingData = {
      room: roomId,
      checkInDate: "2026-06-15",
      checkOutDate: "2026-06-17",
      guests: 2
    };

    const res = await axios.post(
      "http://localhost:5000/api/bookings/create",
      bookingData,
      {
        headers: {
          Authorization: token
        }
      }
    );

    alert(res.data.message);

  } catch (err) {
    console.log(err);
    alert("Booking failed");
  }
};

  return (
    <div>
      <h2>Available Rooms</h2>

      {rooms.map((room) => (
        <div
          key={room._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{room.roomType}</h3>

          <p>Room Number: {room.roomNumber}</p>

          <p>Price: ₦{room.price}</p>

          <p>Capacity: {room.capacity}</p>

          <p>
            Status:
            {room.available
              ? " Available"
              : " Not Available"}
          </p>
          <button onClick={() => bookRoom(room._id)}> Book Room</button>
        </div>
      ))}
    </div>
  );
}

export default Rooms;