import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Events from "./components/Events";
import EventDetailed from "./components/EventDetailed";
import Navigation from "./components/Navigation";
import NewEvent from "./components/NewEvent";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";

import "./App.css";
import UpdateEvent from "./components/UpdateEvent";
import Signup from "./components/Signup";
import { ToastProvider } from "./shared/ToastContext";
import Toast from "./shared/Toast";

const App = () => {
  return (
    <ToastProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Events />} />
          <Route
            path="/createevent"
            element={
              <ProtectedRoute>
                <NewEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateevent/:eventId"
            element={
              <ProtectedRoute>
                <UpdateEvent />
              </ProtectedRoute>
            }
          />
          <Route path="/events/:eventId" element={<EventDetailed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/401" element={<Unauthorized />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Toast />
      </Router>
    </ToastProvider>
  );
};

export default App;
