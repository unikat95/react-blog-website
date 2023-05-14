import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import BlogContext from "../../context/BlogContext";

export default function ProtectedRoutes({ children }) {
  const { user } = useContext(BlogContext);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" />;
  }

  console.log(location.pathname === "/signup");

  return children;
}
