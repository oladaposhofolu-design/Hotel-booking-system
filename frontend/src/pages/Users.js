import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://hotel-booking-backend-ot49.onrender.com/api/users/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>All Users</h2>

      {users.map((user) => (
        <div key={user._id} className="card">
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default Users;