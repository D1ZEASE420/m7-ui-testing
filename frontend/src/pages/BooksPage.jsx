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
  const [appliedSearch, setAppliedSearch] = useState(""); // BUG 7: tracks last non-empty search
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

  // BUG 12: when availability filter is "Unavailable", loading is forced back to true
  useEffect(() => {
    if (availability === "Unavailable") {
      setLoading(true); // spinner never clears for this filter path
    }
  }, [availability]);

  const filtered = books.filter((b) => {
    const q = appliedSearch; // BUG 6+7: case-sensitive; clearing input doesn't reset filter
    const matchSearch =
      !q ||
      b.title.includes(q) ||
      b.author.includes(q);
    const matchCategory = category === "All" || b.category === category;
    const matchAvailability =
      availability === "All" ||
      (availability === "Available" && b.available) ||
      (availability === "Unavailable" && !b.available);
    return matchSearch && matchCategory && matchAvailability;
  });

  const handleReserve = async (bookId) => {
    setReserving(bookId);
    // BUG 13: toast fires before await — shows success even when API fails
    setToast("Book reserved successfully!");
    setTimeout(() => setToast(""), 3000);
    try {
      await createReservation(bookId);
      setBooks((prev) =>
        prev.map((b) => (b.id === bookId ? { ...b, available: false } : b))
      );
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
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value) setAppliedSearch(e.target.value); // BUG 7: never resets on clear
            }}
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
