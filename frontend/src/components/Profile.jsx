import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { getUserInfo } from "../utils/getUsernInfo";
import Event from "./Event";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userEmail, userId } = getUserInfo();
  const token = localStorage.getItem("authToken");
  const [regEvents, setRegEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/my-events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching user events:", err);
      });

    fetch(`http://localhost:8080/users/${userId}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(({ events }) => {
        setRegEvents(events);
      })
      .catch((error) => {
        console.error("Error fetching registered events:", error);
      });
  }, [token, userId]);

  const handleLogout = () => {
    navigate("/", { replace: true });

    // Workaround to redirect user to homepage
    // instead of Unauthorized page after logout
    setTimeout(() => {
      logout();
    }, 1);
  };

  if (loading) {
    return (
      <div className="fallback">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="row">
        <div className="col-md user-profile">
          <h1>User Profile</h1>
          <p>
            <strong>User Email: </strong>
            {userEmail}
          </p>
          <p>
            <strong>User Id: </strong>
            {userId}
          </p>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => handleLogout()}
          >
            <i className="bi bi-box-arrow-left"></i>
            Logout
          </button>
        </div>
        <div className="col-md-12 center-element event-list">
          {userEvents && userEvents.length > 0 ? (
            userEvents.map((event) => (
              <Event key={event.ID} event={event} regEvents={regEvents} />
            ))
          ) : (
            <div className="card card-filtered w-100">
              <div className="card-body">
                <h5 className="card-title">No events</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
