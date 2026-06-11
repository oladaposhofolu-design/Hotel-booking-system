import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#1e3a8a",
        padding: "15px",
        display: "flex",
        gap: "20px"
      }}
    >
      <Link
        to="/"
        style={{ color: "white", textDecoration: "none" }}
      >
        Home
      </Link>

      <Link
        to="/rooms"
        style={{ color: "white", textDecoration: "none" }}
      >
        Rooms
      </Link>

      <Link
        to="/dashboard"
        style={{ color: "white", textDecoration: "none" }}
      >
        Dashboard
      </Link>

      <Link
        to="/my-bookings"
        style={{ color: "white", textDecoration: "none" }}
      >
        My Bookings
      </Link>

      <Link
        to="/login"
        style={{ color: "white", textDecoration: "none" }}
      >
        Login
      </Link>

      <Link
        to="/register"
        style={{ color: "white", textDecoration: "none" }}
      >
        Register
      </Link>
    </nav>
  );
}

export default Navbar;