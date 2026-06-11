import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Rooms from "./pages/Rooms";
import MyBookings from "./pages/MyBookings";
import Dashboard from "./pages/Dashboard";
import BookRoom from "./pages/BookRoom";
import AdminBookings from "./pages/AdminBookings";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
         path="/rooms"
         element={<Rooms />}
           /> 
        <Route
         path="/my-bookings"
         element={<MyBookings />}
           /> 
        <Route
         path="/dashboard"
         element={<Dashboard />}
           /> 
      <Route
  path="/book-room/:id"
  element={<BookRoom />}
/>
       
       <Route path="/admin-bookings" element={<AdminBookings />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;