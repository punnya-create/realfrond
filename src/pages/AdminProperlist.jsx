import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashbord.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setPropertyList } from "../redux/state";
import ListingCard from "../components/ListingCard";

function AdminProperlist() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);
  const propertyList = useSelector((state) => state.user?.propertyList || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://realbackend-nobh.onrender.com";

  // Protect the route: redirect non-admins to homepage
  useEffect(() => {
    if (!user || role !== "admin") {
      navigate("/");
    }
  }, [user, role, navigate]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user || !user._id) {
      navigate("/login");
    }
  }, [user, navigate]);

  const getPropertyList = async () => {
    try {
      const response = await fetch(`${API_URL}/properties`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);

      // Log access to Admin Property List with timestamp
      console.log(
        `Admin accessed Property List at: ${new Date(
          "2025-05-16T20:16:00+05:30"
        ).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
      );
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.log("Fetch all properties failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && role === "admin") {
      getPropertyList();
    }
  }, [user, role]);

  // Handle logout
  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  // Handle property deletion
 

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
        <div className="col-md-10">
          <h1 className="mt-4 text-center">Property List</h1>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="list p-3">
              {propertyList.length > 0 ? (
                propertyList.map(
                  ({
                    _id,
                    creator,
                    listingPhotoPaths,
                    city,
                    province,
                    country,
                    category,
                    type,
                    price,
                    booking = false,
                  }) => (
                    <div key={_id} className="mb-3">
                      <ListingCard
                        listingId={_id}
                        creator={creator}
                        listingPhotoPaths={listingPhotoPaths}
                        city={city}
                        province={province}
                        country={country}
                        category={category}
                        type={type}
                        price={price}
                        booking={booking}
                      />
                      
                    </div>
                  )
                )
              ) : (
                <p className="text-center">No properties found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProperlist;