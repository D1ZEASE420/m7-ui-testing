import React, { useEffect, useState } from "react";
import { getMyReservations, cancelReservation } from "../services/api.js";
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

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyReservations();
      setReservations(data);
    } catch (err) {
      setError(err.message || "Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (reservationId) => {
    setCancelling(reservationId);
    try {
      await cancelReservation(reservationId);
      setReservations((prev) => prev.filter((r) => r.id !== reservationId));
    } catch (err) {
      setError(err.message || "Failed to cancel reservation");
    } finally {
      setCancelling(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container page">
        <h1 className="page-title">My Reservations</h1>

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <LoadingSpinner />
        ) : reservations.length === 0 ? (
          <div className="empty-state" data-testid="reservations-empty">
            You have no active reservations.
          </div>
        ) : (
          <div className="reservations-list" data-testid="reservations-list">
            {reservations.map((r) => (
              <div
                key={r.id}
                className="reservation-card"
                data-testid={`reservation-row-${r.id}`}
              >
                <div className="reservation-info">
                  <div
                    className="reservation-book-title"
                    data-testid={`reservation-book-title-${r.id}`}
                  >
                    {r.book?.title ?? "Unknown book"}
                  </div>
                  <div className="reservation-date">
                    Reserved on {formatDate(r.createdAt)}
                  </div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleCancel(r.id)}
                  disabled={cancelling === r.id}
                  data-testid={`reservation-cancel-${r.id}`}
                >
                  {cancelling === r.id ? "Cancelling…" : "Cancel"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
