import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🏨 HotelBook
        </Link>

        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>

          <Link to="/rooms" onClick={() => setMobileMenuOpen(false)}>
            Rooms
          </Link>

          {token && (
            <>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </Link>

              <Link to="/my-bookings" onClick={() => setMobileMenuOpen(false)}>
                My Bookings
              </Link>

              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                Admin
              </Link>

              <Link to="/admin-bookings" onClick={() => setMobileMenuOpen(false)}>
                Bookings
              </Link>

              <Link to="/create-room" onClick={() => setMobileMenuOpen(false)}>
                Add Room
              </Link>

              <Link to="/users" onClick={() => setMobileMenuOpen(false)}>
                Users
              </Link>

              <Link to="/payments" onClick={() => setMobileMenuOpen(false)}>
                Payments
              </Link>
            </>
          )}

          {!token ? (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>

              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/change-password" onClick={() => setMobileMenuOpen(false)}>
                Change Password
              </Link>

              <button
                className="logout-btn"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;