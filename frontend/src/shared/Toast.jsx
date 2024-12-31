import React from "react";
import { useToast } from "./ToastContext";
import classNames from "classnames"

const Toast = () => {
  const { showToast, toastMessage } = useToast();

  if (!showToast) return null;

	const toastClass = classNames(
    "toast", 
    "align-items-center", 
    "text-bg-success", 
    "border-0", 
    "position-fixed", 
    "bottom-0", 
    "end-0", 
    "m-3", 
    { "show": showToast }
  );

  return (
    <div
      className={toastClass}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="d-flex">
        <div className="toast-body">{toastMessage}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Toast;
