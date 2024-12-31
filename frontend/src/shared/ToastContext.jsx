import React, { createContext, useState, useContext } from "react";

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 10000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toastMessage, showToastMessage }}>
      {children}
    </ToastContext.Provider>
  );
};