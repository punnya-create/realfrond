import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setLogout } from "../redux/state";
import "../styles/TripList.css";

const ReservationList = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://realbackend-nobh.onrender.com";

  // Protect the route: redirect non-admins
  useEffect(() => {
    if (!user || role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchTrips = async () => {
      try {
        const response = await fetch(`${API_URL}/trips`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch trips: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setTrips(data);
        setLoading(false);
      } catch (err) {
        console.log("Fetch Trip List failed!", err.message);
        setError("Failed to load trips. Please try again.");
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user, role, token, navigate]);

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  if (!user || role !== "admin") {
    return null; // Redirect will handle navigation
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }
  



  return (
    <div>
      <div className="container-fluid row p-0" style={{ minHeight: "100vh" }}>
        <div className="col-md-2 bg-dark">
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
              Add Properties
            </Link>
            <Link to={"/userlist"} className="text-center text-light sidebar">
              <i className="fa-solid fa-users"></i>
              Users List
            </Link>
            <Link to={"/admin/trips"} className="text-center text-light sidebar">
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
          <div className="trip_list">
            <h2 className="mt-4 text-center">All Reservations</h2>
            {trips.length > 0 ? (
              <table className="trip_table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Property</th>
                    <th>City</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Price</th>
                    <th>Photo</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {trips.map((trip) => (
                    <tr key={trip._id}>
                      <td>{trip.customerId ? `${trip.customerId.firstName} ${trip.customerId.lastName}` : "Unknown"}</td>
                      <td>{trip.listingId ? trip.listingId.category : "N/A"}</td>
                      <td>{trip.listingId ? trip.listingId.city : "N/A"}</td>
                      <td>{new Date(trip.startDate).toLocaleDateString()}</td>
                      <td>{new Date(trip.endDate).toLocaleDateString()}</td>
                      <td>${trip.totalPrice}</td>
                      <td>
                        {trip.listingId && trip.listingId.listingPhotoPaths && trip.listingId.listingPhotoPaths.length > 0 ? (
                          <img
                            src={`${API_URL}/${trip.listingId.listingPhotoPaths[0]}`}
                            alt="Property"
                            style={{ maxWidth: "50px", borderRadius: "5px" }}
                            onError={(e) => (e.target.src = "/assets/placeholder.png")}
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <td>{new Date(trip.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No reservations found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
