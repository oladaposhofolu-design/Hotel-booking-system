import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaDumbbell,
  FaCoffee,
  FaShuttleVan,
  FaSpa
} from "react-icons/fa";
import "./Amenities.css";

const amenities = [
  { icon: <FaWifi />, title: "Free Wi-Fi" },
  { icon: <FaSwimmingPool />, title: "Swimming Pool" },
  { icon: <FaParking />, title: "Free Parking" },
  { icon: <FaUtensils />, title: "Restaurant" },
  { icon: <FaCoffee />, title: "Breakfast" },
  { icon: <FaDumbbell />, title: "Fitness Center" },
  { icon: <FaShuttleVan />, title: "Airport Pickup" },
  { icon: <FaSpa />, title: "Spa & Wellness" }
];

function Amenities() {
  return (
    <section className="amenities-section">
      <div className="container">
        <div className="amenities-header">
          <h2>Hotel Amenities</h2>
          <p>Everything you need for a comfortable stay.</p>
        </div>

        <div className="amenities-grid">
          {amenities.map((item, index) => (
            <div key={index} className="amenity-card">
              <div className="amenity-icon">
                {item.icon}
              </div>
              <h6>{item.title}</h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Amenities;