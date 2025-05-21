import "../styles/List.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);
  const propertyList = useSelector((state) => state.user?.propertyList || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://realbackend-nobh.onrender.com";

  console.log("User:", user);
  console.log("Role:", role);
  console.log("Token:", token);
  console.log("Property List from Redux:", propertyList);

  useEffect(() => {
    if (!user || !user._id) {
      navigate("/login");
    } else if (!["user", "admin"].includes(role)) {
      navigate("/");
    } else {
      getPropertyList();
    }
  }, [user, role, navigate]);

  const getPropertyList = async () => {
    try {
      console.log("Fetching properties with token:", token);
      const response = await fetch(`${API_URL}/properties`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch properties: ${errorText}`);
      }

      const data = await response.json();
      console.log("Fetched properties:", data);
      dispatch(setPropertyList(data));
      console.log("Property List after dispatch:", propertyList);
      setLoading(false);

      console.log(
        `Admin accessed Property List at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`
      );
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.log("Fetch all properties failed:", err.message);
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
};

export default PropertyList;