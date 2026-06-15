import { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.put(
        "https://hotel-booking-backend-ot49.onrender.com/api/users/change-password",
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(res.data.message);

      setCurrentPassword("");
      setNewPassword("");

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "Password change failed"
      );
    }
  };

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />

        <br /><br />

        <button type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;