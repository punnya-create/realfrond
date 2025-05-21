import { useEffect, useState } from "react";
import "../styles/List.css";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user?._id); // Add null check for state.user
  const tripList = useSelector((state) => state.user?.tripList || []); // Default to empty array if undefined

  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      const response = await fetch(
        `https://realbackend-nobh.onrender.com/users/${userId}/trips`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Debug the API response
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.error("Fetch Trip List failed!", err.message);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  useEffect(() => {
    if (userId) {
      getTripList();
    } else {
      setLoading(false); // If no userId, skip fetching and stop loading
    }
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {tripList.length > 0 ? (
          tripList.map(
            ({ listingId, hostId, startDate, endDate, totalPrice, booking = true }, index) => {
              // Skip rendering if listingId is null or undefined
              if (!listingId) {
                console.warn(`Skipping trip at index ${index}: listingId is null or undefined`);
                return null;
              }

              return (
                <ListingCard
                  key={`${listingId._id}-${startDate}`} // Add a unique key
                  listingId={listingId._id}
                  creator={hostId?._id || ""} // Add null check for hostId
                  listingPhotoPaths={listingId.listingPhotoPaths || []} // Default to empty array
                  city={listingId.city || "Unknown City"}
                  province={listingId.province || "Unknown Province"}
                  country={listingId.country || "Unknown Country"}
                  category={listingId.category || "Unknown Category"}
                  startDate={startDate}
                  endDate={endDate}
                  totalPrice={totalPrice || 0}
                  booking={booking}
                />
              );
            }
          )
        ) : (
          <p>No trips found.</p> // Display message if tripList is empty
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;