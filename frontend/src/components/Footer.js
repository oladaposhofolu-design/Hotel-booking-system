import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>🏨 HotelBook</h3>
          <p>Your trusted platform for finding and booking the perfect hotel room for your next adventure.</p>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook"><FaFacebook /></a>
            <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
            <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="#linkedin" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/rooms">Browse Rooms</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p className="contact-item">
            <FaPhone /> +234 (0) 123 456 7890
          </p>
          <p className="contact-item">
            <FaEnvelope /> info@hotelbook.com
          </p>
          <p className="contact-item">
            <FaMapMarkerAlt /> 123 Hotel Street, Lagos, Nigeria
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} HotelBook. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;