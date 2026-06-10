import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/login">Login</Link> |
      <Link to="/register">Register</Link>
      <Link to="/rooms">Rooms</Link>
      <Link to="/my-bookings">My Bookings</Link>
      <Link to="/book-room">Book Room</Link>
    </nav>
  );
}

export default Navbar;