import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar() {
  return (
    <section className="search-bar-section">
      <div className="container">
        <div className="search-card">
          <h3>Find Your Perfect Room</h3>
          <form className="search-form">
            <div className="search-group">
              <label>Destination</label>
              <input
                type="text"
                placeholder="Enter city or location"
              />
            </div>

            <div className="search-group">
              <label>Check In</label>
              <input
                type="date"
              />
            </div>

            <div className="search-group">
              <label>Check Out</label>
              <input
                type="date"
              />
            </div>

            <div className="search-group guests">
              <label>Guests</label>
              <select>
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4+ Guests</option>
              </select>
            </div>

            <button type="button" className="search-btn">
              <FaSearch /> Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;