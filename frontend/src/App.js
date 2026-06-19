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
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import CreateRoom from "./pages/CreateRoom";
import Footer from "./components/Footer";
import Users from "./pages/Users";
import Payments from "./pages/Payments";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  return (
    <BrowserRouter>

    <div className="app">
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/rooms" element={<Rooms />} />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-room/:id"
          element={
            <ProtectedRoute>
              <BookRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-bookings"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>

<Route
  path="/create-room"
  element={
    <AdminRoute>
      <CreateRoom />
    </AdminRoute>
  }
/>

<Route
  path="/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>

<Route
  path="/payments"
  element={
    <AdminRoute>
      <Payments />
    </AdminRoute>
  }
/>

<Route
  path="/payment-success"
  element={
    <ProtectedRoute>
      <PaymentSuccess />
    </ProtectedRoute>
  }
/>

      </Routes>

      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;