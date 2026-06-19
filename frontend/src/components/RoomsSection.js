import RoomCard from "./RoomCard";
import "./RoomsSection.css";

const rooms = [
  {
    id: 1,
    name: "Standard Room",
    guests: 2,
    price: "25000",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 2,
    name: "Deluxe Room",
    guests: 3,
    price: "40000",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
  },

  {
    id: 3,
    name: "Executive Suite",
    guests: 4,
    price: "65000",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
  }
];

function RoomsSection() {
  return (
    <section className="rooms-section">
      <div className="container">
        <div className="rooms-section-header">
          <h2>Our Rooms & Suites</h2>
          <p>Choose the perfect room for a relaxing and memorable stay.</p>
        </div>

        <div className="rooms-showcase">
          {rooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoomsSection;