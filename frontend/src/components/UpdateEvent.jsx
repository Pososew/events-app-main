import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../shared/ToastContext";

const UpdateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { showToastMessage } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    dateTime: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDateTime = new Date(event.dateTime).toISOString();
    const token = localStorage.getItem("authToken");

    fetch(`http://localhost:8080/events/${eventId}`, {
      method: "PUT",
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
      .then((data) => {
        if (data.message === "Event updated successfully") {
          showToastMessage("Event has been updated successfully!");
          navigate("/");
        } else {
          setError("Error updating event");
        }
      })
      .catch((err) => {
        setError("Error updating event");
        console.error("Error updating event:", err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch(`http://localhost:8080/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        const localDateTime = new Date(data.DateTime)
          .toISOString()
          .slice(0, 16);

        setEvent({
          title: data.Title,
          description: data.Description,
          location: data.Location,
          dateTime: localDateTime,
          userId: data.UserID,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching event data", err);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return (
      <div className="fallback">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="card p-4">
        <h2 className="text-center mb-4">Update an Event</h2>
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
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
