import React, { useEffect, useState } from "react";
import { getBooks, adminAddBook, adminToggleAvailability } from "../services/api.js";
import Navbar from "../components/Navbar.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const CATEGORIES = ["Programming", "JavaScript", "Architecture", "CSS", "Testing", "Other"];

export default function AdminBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state
  const [form, setForm] = useState({ title: "", author: "", category: "Programming", available: true });
  const [formErrors, setFormErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchBooks = async () => {
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
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const errs = validate();
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await adminAddBook(form); // BUG 14: book saved but state not updated — list won't refresh
      setForm({ title: "", author: "", category: "Programming", available: true });
    } catch (err) {
      setFormError(err.message || "Failed to add book");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (book) => {
    try {
      const updated = await adminToggleAvailability(book.id, !book.available);
      setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    } catch (err) {
      setError(err.message || "Failed to update book");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container page">
        <h1 className="page-title">Admin — Books</h1>

        <div className="admin-form">
          <h2>Add New Book</h2>

          {formError && (
            <div className="alert alert-error" data-testid="admin-book-error">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="admin-book-title">Title</label>
              <input
                id="admin-book-title"
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                data-testid="admin-book-title"
              />
              {formErrors.title && (
                <span className="validation-msg">{formErrors.title}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="admin-book-author">Author</label>
              <input
                id="admin-book-author"
                type="text"
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                data-testid="admin-book-author"
              />
              {formErrors.author && (
                <span className="validation-msg">{formErrors.author}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="admin-book-category">Category</label>
              <select
                id="admin-book-category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                data-testid="admin-book-category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <div className="checkbox-row">
                <input
                  id="admin-book-available"
                  type="checkbox"
                  checked={form.available}
                  onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))}
                  data-testid="admin-book-available"
                />
                <label htmlFor="admin-book-available">Available</label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              data-testid="admin-book-submit"
            >
              {submitting ? "Adding…" : "Add Book"}
            </button>
          </form>
        </div>

        {error && <ErrorMessage message={error} onRetry={fetchBooks} />}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="table-container">
            <table data-testid="admin-books-list">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>
                      <span
                        className={`badge ${book.available ? "badge-available" : "badge-unavailable"}`}
                      >
                        {book.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleToggle(book)}
                        data-testid={`admin-book-toggle-${book.id}`}
                      >
                        {book.available ? "Mark Unavailable" : "Mark Available"}
                      </button>
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
