import React from "react";

const Confirmation = ({ type, onConfirm, onCancel, show }) => {
  let modalTitle,
    modalBody,
    modalConfirmButton = "";

  switch (type) {
    case "deletionConfirm":
      modalTitle = "Confirm deletion";
      modalBody = " Are you sure you want to delete this event?";
      modalConfirmButton = "Delete";
      break;
    case "registrationConfirm":
      modalTitle = "Confirm registration";
      modalBody = " Are you sure you want to register for this event?";
      modalConfirmButton = "Confirm";
      break;
    default:
      break;
  }

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      tabIndex="-1"
      aria-hidden={show ? "false" : "true"}
      style={show ? { display: "block" } : {}}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteConfirmationModalLabel">
              {modalTitle}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{modalBody}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn ${
                type === "deletionConfirm" ? "btn-danger" : "btn-success"
              }`}
              onClick={onConfirm}
              data-bs-dismiss="modal"
            >
              {modalConfirmButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
