import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../shared/ToastContext";

const Signup = () => {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 2 || formData.password.length > 10) {
      setError("Password must be between 2-10 characters");
      return;
    }

    const signupData = {
      email: formData.email,
      password: formData.password,
    };
    setLoading(true);
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Signup failed");
        }
        return response.json();
      })
      .then(() => {
        // Return token? And navigate to home page?
        showToastMessage(`User ${formData.email} has been created!`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        setError("Signup failed. Please try again.");
      })
      .finally(() => setLoading(false));
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
      <div className="card p-4">
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            User email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="emailInput"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="passwordInput"
            className="form-control"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPasswordInput" className="form-label">
            Re-enter password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPasswordInput"
            className="form-control"
            placeholder="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-describedby="passwordHelpBlock"
          />
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 2-10 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button
          className="btn btn-secondary w-100"
          type="button"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
