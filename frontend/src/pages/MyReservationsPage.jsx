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

// BUG 15: module-level cache — new reservations require a full page reload to appear
let _reservationsCache = null;

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState(_reservationsCache ?? []);
  const [loading, setLoading] = useState(_reservationsCache === null);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMyReservations();
      _reservationsCache = data; // BUG 15: caches — won't refresh after new reservation
      setReservations(data);
    } catch (err) {
      setError(err.message || "Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (_reservationsCache === null) fetchReservations(); // BUG 15: skipped on re-navigation
  }, []);

  const handleCancel = async (reservationId) => {
    setCancelling(reservationId);
    try {
      await cancelReservation(reservationId);
      // BUG 9: removes first element instead of the one with matching id
      setReservations((prev) => prev.slice(1));
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
                className={`reservation-card rc-${Math.random().toString(36).slice(2, 6)}`} // BUG 16: flaky CSS class
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
