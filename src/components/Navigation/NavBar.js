import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const NavBar = ({ user, setUser }) => {
  return (
    <>
      <nav className="navbar-container">
        <ul>
          <li>
            <Link to="/" className="navbar-links">
              Home
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login" className="navbar-links">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="navbar-links">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="navbar-links">
                {`${user.username}'s Dashboard`}
              </Link>
              <Link to="/upload" className="navbar-links">
                Upload
              </Link>
              <Link to="/" className="navbar-links" onClick={() => setUser(null)}>
                Logout
              </Link>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
