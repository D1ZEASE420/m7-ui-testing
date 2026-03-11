import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/dashboard" className="btn btn-secondary">
        Go to Dashboard
      </Link>
    </div>
  );
}
