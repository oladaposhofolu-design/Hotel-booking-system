import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://hotel-booking-backend-ot49.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");

      console.log(res.data);

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;