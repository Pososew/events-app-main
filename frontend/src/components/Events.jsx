import React, { useState, useEffect } from "react";
import Event from "./Event";
import { getUserInfo } from "../utils/getUsernInfo";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [regEvents, setRegEvents] = useState([]);
  const token = localStorage.getItem("authToken");
  const { userId } = getUserInfo();

  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          setEvents([]);
        } else {
          setEvents(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });

    if (token) {
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
    }
  }, [token, userId]);

  if (loading) {
    return (
      <div className="fallback">
        <div className="loader"></div>
      </div>
    );
  }

  const filteredEvents = events.filter((event) =>
    event.Title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="main-container">
      <div className="mb-3 col-md-2 filter-input">
        <h5>Filter events</h5>
        <input
          type="text"
          className="form-control"
          placeholder="Filter events by title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="center-element event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
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
  );
};

export default EventList;
