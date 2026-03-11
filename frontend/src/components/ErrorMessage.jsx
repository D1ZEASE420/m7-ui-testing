import React from "react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert alert-error" data-testid="error-message">
      {message}
      {onRetry && (
        <button
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: "1rem" }}
          onClick={onRetry}
          data-testid="error-retry"
        >
          Retry
        </button>
      )}
    </div>
  );
}
