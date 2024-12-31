import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <div className="fallback">
      <div className="d-flex align-items-center">
        <i className="bi bi-bug"></i>
        <h1 className="ms-3">Something went wrong</h1>
      </div>
      <p className="mt-3">
        Something went wrong. Redirecting to the home page in{" "}
        <strong>{counter}</strong> seconds.
      </p>
    </div>
  );
};

export default NotFound;
