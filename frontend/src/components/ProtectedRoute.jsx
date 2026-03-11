import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../services/auth.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

export default function ProtectedRoute({ requireAdmin = false }) {
  const { user } = useAuth();

  if (user === undefined) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
