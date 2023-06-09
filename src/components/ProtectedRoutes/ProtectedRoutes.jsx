import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import BlogContext from "../../context/BlogContext";
import LoadingProfile from "../LoadingProfile/LoadingProfile";

export default function ProtectedRoutes({ children }) {
  const { user, isProfileLoading } = useContext(BlogContext);

  if (isProfileLoading) {
    return <LoadingProfile />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
