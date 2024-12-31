import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setError("");

    // user1@test.com
    // test1
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.status === 401) {
          setError("Incorrect email or password.");
          throw new Error("Unauthorized");
        }

        return response.json();
      })
      .then((data) => {
        const token = data.token;
        login(token);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during login:", error);
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
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="inputPassword"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
          />
          {error && <div className="alert alert-danger mt-2">{error}</div>}{" "}
          <br />
          <button
            disabled={credentials.email === "" || credentials.password === ""}
            className="btn btn-primary w-100"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className="d-flex justify-content-center w-100 mt-2">or</p>
          <button
            className="btn btn-secondary w-100"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
