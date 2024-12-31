import React from "react";
import { Link } from "react-router-dom";
import { truncate } from "../utils/truncate";

const Event = ({ event, regEvents = [] }) => {
  const isRegistered =
    regEvents &&
    regEvents.length > 0 &&
    regEvents.some(({ EventID }) => EventID === event.ID);

  return (
    <div className="card w-100">
      <Link to={`/events/${event.ID}`}>
        <div className="vignette-effect">
          <img
            src={`https://picsum.photos/300/100?random=${event.ID}`}
            className="card-img-top"
            alt=""
          />
        </div>
        <div className="card-body">
          {isRegistered && (
            <span className="badge text-bg-success">You're registered!</span>
          )}
          <h5 className="card-title">{event.Title}</h5>
          <p className="card-text">{truncate(event.Description)}</p>
          <hr />
          <p className="card-text">
            <i className="bi bi-geo-alt-fill"></i>
            <span>{event.Location}</span>
          </p>
          <p className="card-text">
            <i className="bi bi-calendar2-date"></i>
            <span>{new Date(event.DateTime).toLocaleString()}</span>
          </p>
        </div>
        <div className="overlay-text">View Details</div>
      </Link>
    </div>
  );
};

export default Event;
