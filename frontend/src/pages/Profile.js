import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://hotel-booking-backend-ot49.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "https://hotel-booking-backend-ot49.onrender.com/api/users/profile",
        {
          name: user.name,
          email: user.email
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>My Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;