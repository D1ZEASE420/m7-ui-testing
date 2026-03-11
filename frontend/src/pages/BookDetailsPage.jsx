import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, createReservation } from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reserving, setReserving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getBook(parseInt(id, 10))
      .then(setBook)
      .catch((err) => setError(err.message || "Book not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleReserve = async () => {
    setReserving(true);
    try {
      await createReservation(book.id);
      setBook((b) => ({ ...b, available: false }));
      setToast("Book reserved successfully!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to reserve book");
    } finally {
      setReserving(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container page">
        <button
          className="back-link btn btn-ghost btn-sm"
          onClick={() => navigate("/books")}
          data-testid="book-detail-back"
        >
          ← Back to Books
        </button>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {book && !loading && (
          <div className="card" style={{ maxWidth: "600px" }}>
            <h1
              className="page-title"
              style={{ marginBottom: "1rem" }}
              data-testid="book-detail-title"
            >
              {book.title}
            </h1>

            <div className="book-detail-meta">
              <div className="meta-row">
                <span className="meta-label">Author</span>
                <span data-testid="book-detail-author">{book.author}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Category</span>
                <span data-testid="book-detail-category">{book.category}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Status</span>
                <span
                  className={`badge ${book.available ? "badge-available" : "badge-unavailable"}`}
                  data-testid="book-detail-status"
                >
                  {book.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            {book.description && (
              <p className="book-description">{book.description}</p>
            )}

            <button
              className="btn btn-primary"
              onClick={handleReserve}
              disabled={!book.available || reserving}
              data-testid="book-detail-reserve"
            >
              {reserving ? "Reserving…" : "Reserve"}
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="toast" data-testid="reservation-toast">
          {toast}
        </div>
      )}
    </>
  );
}
