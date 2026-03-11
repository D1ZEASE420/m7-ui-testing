# Library Reservation App

A teaching application for a Playwright UI testing course. Students receive this app and write all the tests themselves.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

---

## Installation

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## Running the app

Both the backend and frontend must run at the same time. Open two terminal windows.

**Terminal 1 — backend:**

```bash
cd backend
node src/server.js
```

The API will be available at `http://localhost:3001`.

**Terminal 2 — frontend:**

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Test accounts

| Role    | Email                | Password  |
|---------|----------------------|-----------|
| Student | student@test.com     | test123   |
| Student | student2@test.com    | test123   |
| Admin   | admin@test.com       | admin123  |

---

## Resetting app state

The app uses in-memory storage. All data resets when the backend restarts.

You can also reset via the API without restarting:

```bash
curl -X POST http://localhost:3001/api/test/reset
```

This restores all books and reservations to the original seed state. Useful between test runs.

---

## Branches

| Branch   | Description                              |
|----------|------------------------------------------|
| `main`   | Stable, correct app                      |
| `buggy`  | App with intentional defects for testing |

Switch branches with:

```bash
git checkout buggy
git checkout main
```

After switching branches, restart the backend and refresh the frontend.

---

## Project structure

```
backend/
  src/
    server.js               # Express app, port 3001
    routes/                 # Auth, books, reservations, admin, test helpers
    middleware/             # requireAuth, requireAdmin
    data/
      seed.js               # Initial data
      store.js              # In-memory store + resetStore()

frontend/
  src/
    pages/                  # LoginPage, DashboardPage, BooksPage, etc.
    components/             # Navbar, BookCard, ProtectedRoute, etc.
    services/
      api.js                # All fetch calls to the backend
      auth.js               # Auth context and useAuth hook
    index.css               # All styles (no CSS framework)
```

---

## API overview

| Method | Path                        | Description                  |
|--------|-----------------------------|------------------------------|
| POST   | /api/login                  | Log in                       |
| POST   | /api/logout                 | Log out                      |
| GET    | /api/me                     | Get current user             |
| GET    | /api/books                  | List all books               |
| GET    | /api/books/:id              | Get one book                 |
| GET    | /api/my-reservations        | Get current user's reservations |
| POST   | /api/reservations           | Reserve a book               |
| DELETE | /api/reservations/:id       | Cancel a reservation         |
| POST   | /api/admin/books            | Add a book (admin only)      |
| PATCH  | /api/admin/books/:id        | Update a book (admin only)   |
| GET    | /api/admin/reservations     | List all reservations (admin only) |
| POST   | /api/test/reset             | Reset store to seed state    |
| POST   | /api/test/login-as/:role    | Log in as `student` or `admin` without credentials |
