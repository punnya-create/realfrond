import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/UserList.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserList = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://realbackend-nobh.onrender.com/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        setError("Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null; // Redirect will handle navigation
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }

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
    <div className="user_list">
      <h2>All Users</h2>
      <table className="user_table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Profile Image</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                {user.profileImagePath ? (
                  <img
                    src={`https://realbackend-nobh.onrender.com/uploads/${user.profileImagePath}`}
                    alt={`${user.firstName}'s profile`}
                    style={{ maxWidth: "50px", borderRadius: "50%" }}
                    onError={(e) => (e.target.src = "/assets/placeholder.png")}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>{user.role || "user"}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    /</div>
  );
};

export default UserList;