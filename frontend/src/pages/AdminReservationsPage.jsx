import React, { useEffect, useState } from "react";
import { adminGetReservations } from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminGetReservations()
      .then(setReservations)
      .catch((err) => setError(err.message || "Failed to load reservations"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container page">
        <h1 className="page-title">Admin — All Reservations</h1>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <LoadingSpinner />
        ) : reservations.length === 0 ? (
          <div className="empty-state" data-testid="admin-reservations-empty">
            No active reservations.
          </div>
        ) : (
          <div className="table-container">
            <table data-testid="admin-reservations-list">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Book</th>
                  <th>Reserved On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id} data-testid={`admin-reservation-row-${r.id}`}>
                    <td>{r.userName}</td>
                    <td>{r.bookTitle}</td>
                    <td>{formatDate(r.createdAt)}</td>
                    <td>
                      <span className="badge badge-available">{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
