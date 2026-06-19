import { FaHotel, FaConciergeBell, FaAward } from "react-icons/fa";
import "./AboutSection.css";

function AboutSection() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80"
              alt="Hotel"
              className="rounded"
            />
          </div>

          <div className="about-content">
            <h2>Experience Luxury Like Never Before</h2>

            <p className="about-text">
              Welcome to our hotel platform, where elegance meets comfort.
              We offer luxurious rooms, exceptional service, modern
              facilities, and a peaceful environment designed to make every
              guest feel at home.
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <FaHotel />
                </div>
                <div className="feature-content">
                  <h5>Luxury Rooms</h5>
                  <p>Spacious rooms designed for maximum comfort and relaxation.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaConciergeBell />
                </div>
                <div className="feature-content">
                  <h5>24/7 Room Service</h5>
                  <p>Our dedicated staff are available around the clock for you.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaAward />
                </div>
                <div className="feature-content">
                  <h5>Premium Hospitality</h5>
                  <p>Trusted by thousands of satisfied guests worldwide.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;