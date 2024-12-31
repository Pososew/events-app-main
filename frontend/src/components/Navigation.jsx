import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";
import { getUserInfo } from "../utils/getUsernInfo";

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { userEmail } = getUserInfo();
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top bg-body-tertiary bg-dark"
      data-bs-theme="dark"
      style={{ zIndex: 1000 }}
    >
      <div className="container-fluid d-flex justify-content-between">
        <div
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-calendar-event" style={{ fontSize: "2rem" }}></i>
            EVENTO
          </Link>
        </div>
        <ul className="navbar-nav d-flex flex-row mx-auto">
          <li className="nav-item">
            <Link
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
              aria-current="page"
              to="/"
            >
              Home
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/createevent" ? "active" : ""
                }`}
                to="/createevent"
              >
                Create Event
              </Link>
            </li>
          )}
          {isLoggedIn ? (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
                to="/profile"
              >
                <i className="bi bi-person-circle"></i>
                {userEmail || "User"}
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/login" ? "active" : ""
                }`}
                to="/login"
              >
                <i className="bi bi-door-open"></i>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
