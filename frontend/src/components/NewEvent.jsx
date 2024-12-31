import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../shared/ToastContext";

const NewEvent = () => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    dateTime: "",
  });
  const { showToastMessage } = useToast();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDateTime = new Date(event.dateTime).toISOString();
    const token = localStorage.getItem("authToken");
    fetch("http://localhost:8080/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: event.title,
        description: event.description,
        location: event.location,
        dateTime: formattedDateTime,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        showToastMessage("Event has been created successfully!");
        navigate("/");
      })
      .catch((err) => {
        setError("Error creating event");
        console.error("Error creating event:", err);
      });
  };

  return (
    <div className="main-container">
      <div className="card p-4">
        <h2 className="text-center mb-4">Create a New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Event Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={event.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Event Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={event.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Event Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={event.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateTime" className="form-label">
              Event Date and Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="dateTime"
              name="dateTime"
              value={event.dateTime}
              onChange={handleInputChange}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
