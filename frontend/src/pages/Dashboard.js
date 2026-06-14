import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container">
      <h2>User Dashboard</h2>

      <p>Welcome to your hotel booking account.</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px"
        }}
      >
        <div className="card">
          <h3>My Bookings</h3>
          <Link to="/my-bookings">
            View Bookings
          </Link>
        </div>

        <div className="card">
          <h3>Rooms</h3>
          <Link to="/rooms">
            Browse Rooms
          </Link>
        </div>

        <div className="card">
          <h3>Profile</h3>
          <p>Manage account details</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;