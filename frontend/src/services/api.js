const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }

  return data;
}

// Auth
export const login = (email, password) =>
  request("/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const logout = () =>
  request("/logout", { method: "POST" });

export const getMe = () => request("/me");

// Books
export const getBooks = () => request("/books");
export const getBook = (id) => request(`/books/${id}`);

// Reservations
export const getMyReservations = () => request("/my-reservations");

export const createReservation = (bookId) =>
  request("/reservations", { method: "POST", body: JSON.stringify({ bookId }) });

export const cancelReservation = (id) =>
  request(`/reservations/${id}`, { method: "DELETE" });

// Admin
export const adminGetReservations = () => request("/admin/reservations");

export const adminAddBook = (book) =>
  request("/admin/books", { method: "POST", body: JSON.stringify(book) });

export const adminToggleAvailability = (id, available) =>
  request(`/admin/books/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ available }),
  });

// Test helpers
export const testReset = () => request("/test/reset", { method: "POST" });
