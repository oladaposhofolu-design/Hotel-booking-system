import { useState } from "react";
import axios from "axios";

function CreateRoom() {
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    price: "",
    capacity: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("roomNumber", formData.roomNumber);
      data.append("roomType", formData.roomType);
      data.append("price", formData.price);
      data.append("capacity", formData.capacity);

      if (image) {
        data.append("image", image);
      }

      await axios.post(
        "http://localhost:5000/api/rooms/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Room created successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to create room");
    }
  };

  return (
    <div className="container">
      <h2>Create Room</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="roomNumber"
          placeholder="Room Number"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="roomType"
          placeholder="Room Type"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <br /><br />

        <button type="submit">
          Create Room
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;