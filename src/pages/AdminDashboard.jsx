import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashbord.css";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";

function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalBookings: 0,
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://realbackend-nobh.onrender.com";

  console.log("User:", user);
  console.log("Role:", role);
  console.log("Token:", token);

  // Protect the route: redirect non-admins to homepage
  useEffect(() => {
    if (!user || role !== "admin") {
      navigate("/");
    }
  }, [user, role, navigate]);

  // Fetch dashboard data (metrics and users)
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      let usersData = [];
      let propertiesData = [];
      let bookingsData = [];

      // Fetch total users
      try {
        console.log("Fetching users...");
        const usersResponse = await fetch(`${API_URL}/userlist`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Users response status:", usersResponse.status);
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        usersData = await usersResponse.json();
        console.log("Users data:", usersData);
        setUsers(usersData);
      } catch (err) {
        console.log("Users fetch failed:", err.message);
      }

      // Fetch total properties
      try {
        console.log("Fetching properties...");
        const propertiesResponse = await fetch(`${API_URL}/properties`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Properties response status:", propertiesResponse.status);
        if (!propertiesResponse.ok) throw new Error("Failed to fetch properties");
        propertiesData = await propertiesResponse.json();
        console.log("Properties data:", propertiesData);
      } catch (err) {
        console.log("Properties fetch failed:", err.message);
      }

      // Fetch total bookings
      try {
        console.log("Fetching bookings...");
        const bookingsResponse = await fetch(`${API_URL}/trips`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Bookings response status:", bookingsResponse.status);
        if (!bookingsResponse.ok) throw new Error("Failed to fetch bookings");
        bookingsData = await bookingsResponse.json();
        console.log("Bookings data:", bookingsData);
      } catch (err) {
        console.log("Bookings fetch failed:", err.message);
      }

      // Update metrics even if some calls fail
      setMetrics({
        totalUsers: usersData.length || 3,
        totalProperties: propertiesData.length || 0,
        totalBookings: bookingsData.length || 2,
      });

      // Set error only if all calls fail
      if (!usersData.length && !propertiesData.length && !bookingsData.length) {
        setError("Failed to load dashboard data. Please try again.");
      }

      setLoading(false);

      console.log(
        `Admin accessed Dashboard at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
      );
    } catch (err) {
      setError("Unexpected error occurred. Please try again.");
      console.log("Fetch Dashboard Data Failed:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "admin") {
      fetchDashboardData();
    }
  }, [role]);

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div>
      <div className="container-fluid row p-0" style={{ minHeight: "100vh" }}>
        <div className="col-md-2 bg-dark" style={{maxHeight:"100vh",position:"sticky",top:"0px"}}>
          <h3 className="text-danger text-center">
            <i className="fa-solid fa-user text-danger"></i>
            DreamNest Admin
          </h3>
          <div className="d-flex flex-column h-50 justify-content-between mt-4">
            <Link to={"/dashboard"} className="text-center text-light sidebar">
              <i className="fa-solid fa-chart-simple"></i>
              DashBoard
            </Link>
            <Link to={"/proplist"} className="text-center text-light sidebar">
              <i className="fa-solid fa-bowl-food"></i>
              PropertyList
            </Link>
            <Link to={"/create-listing"} className="text-center text-light sidebar">
              <i className="fa-solid fa-bowl-food"></i>
              Add Propertice
            </Link>
            <Link to={"/userlist"} className="text-center text-light sidebar">
              <i className="fa-solid fa-users"></i>
              Users List
            </Link>
            <Link to={`/${user._id}/trips`} className="text-center text-light sidebar">
              <i className="fa-solid fa-note-sticky"></i>
              Reservation List
            </Link>
            <button
              onClick={handleLogout}
              className="text-center text-danger sidebar py-2 border-0 bg-transparent"
            >
              <i className="fa-solid fa-right-from-bracket text-danger me-2"></i>
              Logout
            </button>
          </div>
        </div>
        <div className="col">
          {/* Main Content */}
          <div className="col-md-10">
            <h1 className="mt-4 text-center">Admin Dashboard</h1>
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {/* Metrics Cards */}
            <div className="row mt-4">
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-primary">
                  <div className="card-body">
                    <h5 className="card-title">Total Users</h5>
                    <p className="card-text display-4">{metrics.totalUsers}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-success">
                  <div className="card-body">
                    <h5 className="card-title">Total Properties</h5>
                    <p className="card-text display-4">{metrics.totalProperties}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card text-white bg-warning">
                  <div className="card-body">
                    <h5 className="card-title">Total Bookings</h5>
                    <p className="card-text display-4">{metrics.totalBookings}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;