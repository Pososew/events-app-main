import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { useToast } from "../shared/ToastContext";
import { getUserInfo } from "../utils/getUsernInfo";
import Confirmation from "../shared/Confirmation";

const EventDetailed = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { userId } = getUserInfo();
  const { showToastMessage } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    dateTime: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [regEvents, setRegEvents] = useState([]);

  const token = localStorage.getItem("authToken");

  const showDeleteModal = () => {
    setModalType("deletionConfirm");
    setShowModal(true);
  };

  const showRegisterModal = () => {
    setModalType("registrationConfirm");
    setShowModal(true);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent({
          title: data.Title,
          description: data.Description,
          location: data.Location,
          dateTime: data.DateTime,
          userId: data.UserID,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching event data", err);
        setLoading(false);
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
  }, [eventId, token, userId]);

  const handleUpdateRedirect = () => {
    navigate(`/updateevent/${eventId}`);
  };

  const handleRegister = () => {
    setLoading(true);
    fetch(`http://localhost:8080/events/${eventId}/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Registered!") {
          showToastMessage(
            `You have successfully registered for ${event.title}!`
          );
        } else {
          showToastMessage("Error while registering for the event!");
        }
      })
      .catch((error) => {
        console.error("Error registering for event:", error);
      })
      .finally(() => {
        navigate("/");
        setLoading(false);
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:8080/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Event deleted successfully") {
          showToastMessage(`${event.title} has been deleted!`);
          navigate("/");
        } else {
          showToastMessage("Error while deleting the event!");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        alert("There was an error deleting the event.");
      });
  };

  if (loading) {
    return (
      <div className="fallback">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  const isRegistered =
    regEvents && regEvents.length > 0 &&
    regEvents.some(({ EventID }) => EventID === parseInt(eventId));

  return (
    <div className="main-container">
      <div className="card">
        <img
          src={`https://picsum.photos/300/100?random=${eventId}`}
          className="card-img-top"
          alt=""
        />
        <div className="card-body">
          {isRegistered && (
            <span className="badge text-bg-success">You're registered!</span>
          )}
          <h5 className="card-title">{event.title}</h5>
          <br />
          <p className="card-text">
            {event.description}
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque,
            vitae. Vel eum, consequatur minus iusto voluptas, numquam quos fuga
            tempora accusantium fugit debitis repellendus, sit libero explicabo.
            Eaque fugit a vitae nihil rem, eum nam qui iure nisi, minima vel?
            Dolores asperiores culpa voluptate error ut necessitatibus qui
            officia impedit iste incidunt eveniet ratione quod esse nisi,
            perferendis labore, reiciendis possimus amet voluptates. Iste
            assumenda aliquam laborum voluptatibus, impedit expedita! Tenetur
            reprehenderit rem dolorum quam quos magni corrupti unde amet
            sapiente odio officia animi saepe repellendus at, cupiditate illum
            doloribus vero quae hic veniam, magnam alias repudiandae.
            Praesentium, tenetur architecto.
          </p>
          <hr />
          <p className="card-text">
            <i className="bi bi-geo-alt-fill"></i>
            <span>{event.location}</span>
          </p>
          <p className="card-text">
            <i className="bi bi-calendar2-date"></i>
            <span>{new Date(event.dateTime).toLocaleString()}</span>
          </p>
          <p className="card-text">
            <i className="bi bi-person"></i>
            <span>{event.userId}</span>
          </p>
          {isLoggedIn && (
            <>
              <hr />
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-danger flex-fill me-3"
                  type="button"
                  onClick={showDeleteModal}
                >
                  <i className="bi bi-trash3"></i>
                  Delete event
                </button>

                <button
                  className={`btn btn-warning flex-fill ${
                    isRegistered ? "" : "me-3"
                  }`}
                  type="button"
                  onClick={() => handleUpdateRedirect()}
                >
                  <i className="bi bi-pencil-fill"></i>
                  Edit event
                </button>

                {!isRegistered && (
                  <button
                    className="btn btn-success flex-fill"
                    type="button"
                    onClick={showRegisterModal}
                  >
                    <i className="bi bi-check-circle"></i>
                    Register for event
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <Confirmation
        type={modalType}
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={
          modalType === "deletionConfirm" ? handleDelete : handleRegister
        }
      />
    </div>
  );
};

export default EventDetailed;
