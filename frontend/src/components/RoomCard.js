import { FaUserFriends, FaWifi, FaTv, FaSnowflake, FaStar } from "react-icons/fa";
import "./RoomCard.css";

function RoomCard({ room }) {
  return (
    <div className="room-card-wrapper">
      <div className="room-card">
        <div className="room-card-image">
          <img
            src={room.image}
            alt={room.name}
          />
          <div className="room-rating">
            <FaStar /> 4.8
          </div>
        </div>

        <div className="room-card-body">
          <h4>{room.name}</h4>

          <p className="room-description">
            Perfect for up to {room.guests} guests
          </p>

          <div className="room-amenities">
            <span title="Guests">
              <FaUserFriends /> {room.guests}
            </span>

            <span title="Wi-Fi">
              <FaWifi />
            </span>

            <span title="TV">
              <FaTv />
            </span>

            <span title="AC">
              <FaSnowflake />
            </span>
          </div>

          <div className="room-price">
            ₦{room.price}/Night
          </div>

          <button className="book-room-btn">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;