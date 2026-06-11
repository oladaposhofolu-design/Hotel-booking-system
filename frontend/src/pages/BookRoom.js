import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BookRoom() {
  const { id } = useParams();
 const [roomId] = useState(id);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/bookings/create",
        {
          room: roomId,
          checkInDate,
          checkOutDate,
          guests
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);

    } catch (err) {
      alert("Booking failed");
      console.log(err);
    }
  };

  return (
    <div>
      <div> 
      <h2>Book Room</h2>

      </div>
     
      <form onSubmit={handleSubmit}>
       

        

        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />

        <br /><br />

        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />

        <br /><br />

        <input
          type="number"
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Book Room
        </button>
      </form>
    </div>
  );
}

export default BookRoom;