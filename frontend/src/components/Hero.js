import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Find Your Perfect Stay
          </h1>

          <p className="hero-subtitle">
            Book luxury hotels at affordable prices anywhere in the world. 
            Discover amazing accommodations that fit your budget and preferences.
          </p>

          <div className="hero-buttons">
            <Link to="/rooms" className="btn btn-primary btn-lg">
              Explore Rooms <FaArrowRight />
            </Link>
            <Link to="/register" className="btn btn-outline btn-lg">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;