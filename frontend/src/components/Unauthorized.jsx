import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      navigate("/login");
    }

    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <div className="fallback">
      <div className="d-flex align-items-center">
        <i className="bi bi-ban"></i>
        <h1 className="ms-3">Not Authorized</h1>
      </div>
      <p className="mt-3">
        You are not authorized to access this page. Redirecting to the login
        page in <strong>{counter}</strong> seconds.
      </p>
    </div>
  );
};

export default Unauthorized;
