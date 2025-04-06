// components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const VendorRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user || (user.userRole !== "vendor" && user.userRole !== "admin")) {
    return <Navigate to="/" replace />;
  }  

  return children;
};

export default VendorRoute;