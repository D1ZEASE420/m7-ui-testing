import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book, onReserve, reserving }) {
  return (
    <div className="book-card" data-testid={`book-card-${book.id}`}>
      <div className="book-card-title" data-testid={`book-title-${book.id}`}>
        {book.title}
      </div>
      <div className="book-card-author" data-testid={`book-author-${book.id}`}>
        {book.author}
      </div>
      <div className="book-card-category">{book.category}</div>

      <div className="book-card-footer">
        <span
          className={`badge ${book.available ? "badge-available" : "badge-unavailable"}`}
          data-testid={`book-status-${book.id}`}
        >
          {book.available ? "Available" : "Unavailable"}
        </span>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link
            to={`/books/${book.id}`}
            className="btn btn-secondary btn-sm"
            data-testid={`book-details-${book.id}`}
          >
            Details
          </Link>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onReserve(book.id)}
            disabled={(book.id !== 6 && !book.available) || reserving === book.id} // BUG 5: book 6 ignore availability
            data-testid={`book-reserve-${book.id}`}
          >
            {reserving === book.id ? "Reserving…" : "Reserve"}
          </button>
        </div>
      </div>
    </div>
  );
}
