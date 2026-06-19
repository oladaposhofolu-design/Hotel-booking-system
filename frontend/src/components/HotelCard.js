import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

function HotelCard({ hotel }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden">

        <img
          src={hotel.image}
          alt={hotel.name}
          style={{
            height: "230px",
            objectFit: "cover"
          }}
        />

        <div className="card-body">

          <h4 className="fw-bold">
            {hotel.name}
          </h4>

          <p className="text-muted mb-2">
            <FaMapMarkerAlt className="me-2 text-danger"/>
            {hotel.city}
          </p>

          <div className="mb-3">
            <FaStar className="text-warning"/>
            <FaStar className="text-warning"/>
            <FaStar className="text-warning"/>
            <FaStar className="text-warning"/>
            <FaStar className="text-warning"/>
          </div>

          <h5 className="text-primary fw-bold">
            ₦{hotel.price}/night
          </h5>

          <button className="btn btn-primary w-100 mt-3">
            View Details
          </button>

        </div>

      </div>
    </div>
  );
}

export default HotelCard;