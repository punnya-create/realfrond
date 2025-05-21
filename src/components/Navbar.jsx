import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>
      <div>
        <Link to={`/${user._id}/properties`} className="me-4 text-dark" style={{textDecoration:"none"}}>Property List</Link>
     <Link to="/about" className="me-4 text-dark " style={{textDecoration:"none"}}>About </Link>
      <Link to="/contact" className="me-4 text-dark" style={{textDecoration:"none"}}>Contact</Link>
      
       </div>
      

      <div className="navbar_right">
        

        <button
  className="navbar_right_account"
  onClick={() => setDropdownMenu(!dropdownMenu)}
>
  <Menu />
  
</button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
             <Link to={`/${user._id}/trips`}>Trip List</Link>
             <Link to={'/profile'}>Profile  </Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
