import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="fallback">
        <div className="loader"></div>
      </div>
    );
  }

  return isLoggedIn ? children : <Navigate to="/401" />;
};

export default ProtectedRoute;
