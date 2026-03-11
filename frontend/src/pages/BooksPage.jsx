import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, createReservation } from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import BookCard from "../components/BookCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const CATEGORIES = ["All", "Programming", "JavaScript", "Architecture", "CSS", "Testing"];

export default function BooksPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [reserving, setReserving] = useState(null);
  const [toast, setToast] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError(err.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const filtered = books.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q);
    const matchCategory = category === "All" || b.category === category;
    const matchAvailability =
      availability === "All" ||
      (availability === "Available" && b.available) ||
      (availability === "Unavailable" && !b.available);
    return matchSearch && matchCategory && matchAvailability;
  });

  const handleReserve = async (bookId) => {
    setReserving(bookId);
    try {
      await createReservation(bookId);
      setBooks((prev) =>
        prev.map((b) => (b.id === bookId ? { ...b, available: false } : b))
      );
      setToast("Book reserved successfully!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to reserve book");
    } finally {
      setReserving(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container page">
        <h1 className="page-title">Books</h1>

        <div className="books-toolbar">
          <input
            type="text"
            placeholder="Search by title or author…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="books-search"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            data-testid="books-category-filter"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All categories" : c}
              </option>
            ))}
          </select>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            data-testid="books-availability-filter"
          >
            <option value="All">All availability</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchBooks} />}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filtered.length === 0 ? (
              <div className="empty-state" data-testid="books-empty">
                No books match your search.
              </div>
            ) : (
              <div className="books-grid" data-testid="books-list">
                {filtered.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onReserve={handleReserve}
                    reserving={reserving}
                  />
                ))}
              </div>
            )}
          </>
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
