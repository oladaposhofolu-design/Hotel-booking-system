import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};
  return (
    <nav
      style={{
         background: "#1e293b",
        padding: "15px 30px",
        display: "flex",
        gap: "20px"
      }}
    >
      <Link
        to="/"
        style={{ color: "white" }}
      >
        Home
      </Link>

      <Link
        to="/rooms"
        style={{ color: "white" }}
      >
        Rooms
      </Link>

      <Link
        to="/dashboard"
        style={{ color: "white" }}
      >
        Dashboard
      </Link>

      <Link
        to="/my-bookings"
        style={{ color: "white"}}
      >
        My Bookings
      </Link>

       <Link to="/admin" style={{ color: "white" }}>
        Admin
      </Link>

      <Link
        to="/login"
        style={{ color: "white", textDecoration: "none" }}
      >
        Login
      </Link>

      <Link to="/profile">
  Profile
</Link>

<Link to="/change-password">
  Change Password
</Link>

      <Link
        to="/register"
        style={{ color: "white", textDecoration: "none" }}
      >
        Register
      </Link>
      <button
  onClick={handleLogout}
  style={{
    marginLeft: "auto",
    background: "red"
  }}
>
  Logout
</button>
    </nav>
  );
}

export default Navbar;