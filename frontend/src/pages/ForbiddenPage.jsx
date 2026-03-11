import React from "react";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <div className="error-page">
      <h1>403</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/dashboard" className="btn btn-secondary">
        Go to Dashboard
      </Link>
    </div>
  );
}
