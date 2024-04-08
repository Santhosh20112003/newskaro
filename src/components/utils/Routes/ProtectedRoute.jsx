import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

function ProtectedRoute({ children }) {
  const { user } = useUserAuth();
  if (user) {
    localStorage.setItem("token", user.accessToken);
    return children;
  } else {
    return <Navigate to="/home" />;
  }
}

export default ProtectedRoute;
