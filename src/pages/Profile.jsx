import { useSelector } from "react-redux";
import "../styles/Profile.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  console.log("User object in ProfilePage:", user);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <>
<Navbar />
    <div className="profile">
      <h1>Welcome, {user.firstName} {user.lastName}!</h1>
      <div className="profile_image">
        {user.profileImagePath ? (
          <>
            <img
              src={`https://realbackend-nobh.onrender.com/uploads/${user.profileImagePath}`} // Add "uploads/" explicitly
              alt="Profile"
              style={{ maxWidth: "200px", borderRadius: "50%" }}
              onError={(e) => {
                console.log("Image failed to load");
                e.target.src = "/assets/placeholder.png";
              }}
            />
          </>
        ) : (
          <p>No profile image available.</p>
        )}
      </div>
      <p>Email: {user.email}</p>
    </div>
    <Footer/>
    </>
  );
};

export default ProfilePage;