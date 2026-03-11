Perfect. Since they will set up Playwright themselves, the app should be:

* small enough to understand quickly
* realistic enough for proper UI testing
* rich enough to produce many test cases
* intentionally a little broken

So below is a **complete teaching application spec** you can build or scaffold for them.

# Application concept

## Library Reservation App

A small web app where users can:

* log in
* browse books
* search books
* reserve available books
* cancel reservations
* view their own reservations

Admins can also:

* access admin area
* add books
* change book availability
* view all reservations

This gives you authentication, lists, forms, route protection, conditional rendering, async UI, and state changes.

---

# Tech shape

Keep it simple.

## Suggested stack

* Frontend: plain HTML/CSS/JS with Vite, or simple React app
* Backend: Node.js + Express
* Storage: in-memory seed or JSON file
* Auth: simple session/cookie auth
* Styling: minimal, functional

For teaching UI testing, I would honestly choose:

* **frontend:** simple React or Vite vanilla
* **backend:** Express
* **data:** in-memory seeded dataset with reset endpoint

That keeps the app easy to reset and avoids database chaos during lessons.

---

# Main application flows

## Student flow

1. Open login page
2. Log in
3. Reach dashboard
4. Go to books page
5. Search book
6. Open details
7. Reserve available book
8. Go to my reservations
9. Cancel reservation
10. Log out

## Admin flow

1. Log in as admin
2. Open admin page
3. Add new book
4. Change availability
5. View reservation list

---

# Pages and routes

## Public routes

* `/login`

## Protected student routes

* `/dashboard`
* `/books`
* `/books/:id`
* `/my-reservations`

## Protected admin routes

* `/admin/books`
* `/admin/reservations`

## Suggested fallback routes

* `/403`
* `/404`

---

# UI pages in detail

## 1. Login page

### Elements

* email input
* password input
* login button
* validation message area
* global error message area

### Behavior

* empty form should not submit
* invalid credentials show error
* successful login redirects to dashboard
* session is stored
* logged-in user should not need to log in again until logout

### Test IDs

* `login-email`
* `login-password`
* `login-submit`
* `login-error`
* `login-validation-email`
* `login-validation-password`

---

## 2. Dashboard

### Elements

* welcome title with user name
* role badge
* navigation links
* quick stats cards
* latest reservations section
* logout button

### Behavior

* student sees student navigation
* admin sees admin navigation
* stats reflect seeded data
* logout clears session and redirects to login

### Test IDs

* `dashboard-title`
* `user-role-badge`
* `nav-books`
* `nav-my-reservations`
* `nav-admin-books`
* `nav-admin-reservations`
* `logout-button`

---

## 3. Books page

### Elements

* page title
* search input
* category filter
* availability filter
* list of book cards or rows
* reserve button on available books
* disabled state for unavailable books

### Each book item shows

* title
* author
* category
* availability badge
* details button
* reserve button

### Behavior

* shows all seeded books initially
* search filters by title or author
* category filter works
* availability filter works
* clearing filters resets list
* unavailable books cannot be reserved

### Test IDs

* `books-search`
* `books-category-filter`
* `books-availability-filter`
* `books-list`
* `book-card-{id}`
* `book-title-{id}`
* `book-author-{id}`
* `book-status-{id}`
* `book-details-{id}`
* `book-reserve-{id}`

---

## 4. Book details page

### Elements

* title
* author
* description
* category
* availability
* reserve button
* back button

### Behavior

* correct book details are shown
* reserve button only active when available
* reserving updates state
* back button returns to books page

### Test IDs

* `book-detail-title`
* `book-detail-author`
* `book-detail-category`
* `book-detail-status`
* `book-detail-reserve`
* `book-detail-back`

---

## 5. My reservations page

### Elements

* reservation list
* reservation rows/cards
* reserved at date
* cancel button
* empty state

### Behavior

* only current user’s reservations shown
* newly reserved books appear here
* cancel removes reservation
* count updates immediately
* empty state shown when none exist

### Test IDs

* `reservations-list`
* `reservation-row-{id}`
* `reservation-book-title-{id}`
* `reservation-cancel-{id}`
* `reservations-empty`

---

## 6. Admin books page

### Elements

* add book form
* title input
* author input
* category select
* availability checkbox/select
* add button
* admin books list
* edit availability control

### Behavior

* admin only
* valid form adds book
* invalid form shows validation
* new book appears immediately in list
* availability can be toggled

### Test IDs

* `admin-book-title`
* `admin-book-author`
* `admin-book-category`
* `admin-book-available`
* `admin-book-submit`
* `admin-book-error`
* `admin-books-list`
* `admin-book-toggle-{id}`

---

## 7. Admin reservations page

### Elements

* all reservations table
* user name
* book title
* date
* status

### Behavior

* admin only
* shows all reservations from all users
* student must not access this page

### Test IDs

* `admin-reservations-list`
* `admin-reservation-row-{id}`

---

# Data model

Keep the model tiny.

## User

```js
{
  id: 1,
  name: "Student One",
  email: "student@test.com",
  password: "test123",
  role: "student"
}
```

## Book

```js
{
  id: 1,
  title: "Clean Code",
  author: "Robert C. Martin",
  category: "Programming",
  description: "A book about writing clean code.",
  available: true
}
```

## Reservation

```js
{
  id: 1,
  userId: 1,
  bookId: 2,
  createdAt: "2026-03-11T10:00:00.000Z",
  status: "active"
}
```

---

# Seed data

## Users

* `student@test.com` / `test123`
* `student2@test.com` / `test123`
* `admin@test.com` / `admin123`

## Books

Use 8–10 books, enough for list/filter testing.

Suggested set:

* Clean Code
* Eloquent JavaScript
* You Don’t Know JS
* Refactoring
* The Pragmatic Programmer
* JavaScript: The Good Parts
* Domain-Driven Design
* CSS Secrets

Make at least:

* 2 unavailable
* 2 in same category
* 1 already reserved by student
* 1 with a long title
* 1 with mixed capitalization for search testing

## Reservations

Seed:

* one active reservation for `student@test.com`
* one active reservation for `student2@test.com`

---

# API design

Students do not need to build the API, but the app should behave consistently.

## Auth

* `POST /api/login`
* `POST /api/logout`
* `GET /api/me`

## Books

* `GET /api/books`
* `GET /api/books/:id`

## Reservations

* `GET /api/my-reservations`
* `POST /api/reservations`
* `DELETE /api/reservations/:id`

## Admin

* `POST /api/admin/books`
* `PATCH /api/admin/books/:id`
* `GET /api/admin/reservations`

## Test support

* `POST /api/test/reset`
* `POST /api/test/seed`
* `POST /api/test/login-as/:role`

That reset endpoint is very valuable for keeping test runs predictable.

---

# Full testing list

This is the main part you want.

## A. Login tests

### Positive

* user can open login page
* user can log in with valid student credentials
* admin can log in with valid admin credentials
* successful login redirects to dashboard

### Negative

* empty email shows validation
* empty password shows validation
* wrong password shows invalid credentials error
* unknown email shows invalid credentials error
* user stays on login page after failed login

### Edge

* email with extra spaces is handled correctly
* login button disabled while request is in progress
* already logged-in user visiting `/login` is redirected

---

## B. Dashboard tests

### Positive

* dashboard loads after login
* user name is shown correctly
* logout works
* student sees books and reservations navigation
* admin sees admin links

### Negative

* student does not see admin navigation
* non-authenticated user cannot access dashboard
* after logout protected pages are blocked

---

## C. Books page tests

### Positive

* books page loads after login
* all seeded books are displayed
* each book shows title, author, availability
* clicking details opens details page
* available book has enabled reserve button
* unavailable book has disabled reserve button

### Search/filter

* search by exact title works
* search by partial title works
* search by author works
* search is case-insensitive
* category filter works
* availability filter works
* clearing filters restores full list

### Negative

* no-results state shown when search has no matches
* protected page redirects unauthenticated user

---

## D. Book details tests

### Positive

* details page shows correct book title
* details page shows correct author
* reserve action works from details page
* back button returns to books page

### Negative

* unavailable book cannot be reserved from details page
* invalid book ID shows not found page or error
* unauthenticated user cannot access details page

---

## E. Reservation tests

### Positive

* user can reserve available book
* reserved book appears in My Reservations
* reservation count updates on dashboard
* user can cancel reservation
* cancelled reservation disappears from list
* empty state shown when no reservations exist

### Negative

* duplicate reservation is blocked
* unavailable book cannot be reserved
* one user cannot see another user’s reservations
* canceling already removed reservation shows error or safe fallback

### State tests

* reservation persists after navigating away and back
* reservation remains after page reload

---

## F. Admin tests

### Positive

* admin can open admin books page
* admin can add a valid new book
* newly added book appears in books list
* admin can change availability
* admin can open admin reservations page
* admin sees all reservations

### Negative

* student cannot open admin books page
* student cannot open admin reservations page
* book form validation works
* empty title is rejected
* empty author is rejected

---

## G. Authorization tests

* unauthenticated user visiting protected routes is redirected to login
* student attempting `/admin/books` is blocked
* student attempting `/admin/reservations` is blocked
* admin can access student pages too if intended
* session ends after logout

---

## H. UI state tests

* loading spinner is shown while books load
* loading spinner disappears after successful load
* error state shown when books API fails
* retry button works if you add one
* success toast shown after reservation
* success toast disappears after timeout

---

## I. Accessibility-friendly selector tests

Not accessibility auditing, just good selector habits:

* tests use role selectors when possible
* tests use `data-testid` for unstable areas
* forms can be submitted through accessible controls

---

# Intentional bug list for the teaching version

This is where the app becomes useful for lessons.

## Beginner bugs

1. Wrong redirect after login goes to `/books` instead of `/dashboard`
2. Empty password does not show validation
3. Logout button visually exists but does nothing
4. Dashboard greets wrong user name
5. One unavailable book still has active reserve button

## Intermediate bugs

6. Search is case-sensitive
7. Clearing search input does not restore all books
8. Duplicate reservation is allowed
9. Cancel reservation removes wrong row
10. Student sees admin link in dashboard nav
11. Student can open `/admin/books` by direct URL

## Advanced bugs

12. Loading spinner stays forever on one filter path
13. Success toast appears even when reservation API fails
14. New admin-added book is saved but UI list does not refresh
15. Reservation appears only after full page reload
16. Tests become flaky if selector uses CSS class that changes

You do not need all of these active at once. You can reveal them across lessons.

---

# Suggested folder structure

## Frontend

```txt
frontend/
  src/
    pages/
      LoginPage.jsx
      DashboardPage.jsx
      BooksPage.jsx
      BookDetailsPage.jsx
      MyReservationsPage.jsx
      AdminBooksPage.jsx
      AdminReservationsPage.jsx
    components/
      Navbar.jsx
      BookCard.jsx
      ReservationList.jsx
      ProtectedRoute.jsx
      LoadingSpinner.jsx
      ErrorMessage.jsx
    services/
      api.js
      auth.js
    data/
      testIds.js
    App.jsx
    main.jsx
```

## Backend

```txt
backend/
  src/
    server.js
    routes/
      authRoutes.js
      bookRoutes.js
      reservationRoutes.js
      adminRoutes.js
      testRoutes.js
    middleware/
      requireAuth.js
      requireAdmin.js
    data/
      seed.js
      store.js
    utils/
      resetStore.js
```

---

# Test-friendly UI rules

These matter a lot.

## 1. Add stable `data-testid` attributes

Use them especially for:

* repeated list items
* buttons inside cards
* validation/error messages
* dynamic rows

## 2. Keep text consistent

Do not randomly vary:

* “Reserve”
* “Book reserved”
* “Invalid credentials”

Stable wording makes teaching easier.

## 3. Add visible loading and error states

Do not hide async behavior. Expose it in UI so students can test it.

## 4. Provide reset route

This is one of the best gifts you can give for UI testing.

---

# Suggested states for lessons

## Version 1

* login
* dashboard
* books page
* details page

## Version 2

* reserve flow
* my reservations
* logout
* empty states

## Version 3

* admin pages
* role protection
* validation

## Version 4

* loading indicators
* API failure handling
* planted bugs

That lets you progressively release the app through the course.

---

# What students should set up in Playwright themselves

Since that is your plan, give them only the app and the scenario list.

They should do:

* Playwright installation
* config
* browser install
* first spec file
* helper functions
* auth setup
* selectors
* grouping tests into suites

That is a good learning boundary.

---

# Recommended student challenge progression

## Early

* test valid login
* test invalid login
* test logout
* test books list visible

## Middle

* test search
* test reserve available book
* test unavailable book blocked
* test reservation appears in my reservations

## Later

* test student blocked from admin
* test admin adds book
* test duplicate reservation prevented
* test error state when API fails

---

# Best branches to prepare

Create these branches:

## `main`

Stable, correct app

## `buggy`

App with intentional defects

## `teacher-solution`

Your own full Playwright solution, hidden from students

That setup is excellent for teaching.

---

# Small but important implementation advice

Make the app visually simple. Do not overdesign it.

The purpose is not UI beauty.
The purpose is that students can clearly see:

* what changed
* what failed
* what should be asserted

A clean admin panel and simple card/table views are enough.

---

# Strong final package for you

You now need three things prepared:

## 1. The app

Built according to the structure above

## 2. The bug sheet

Private to you, listing intentional defects

## 3. The exercise sheet for students

Only scenarios, not answers

Example exercise wording:

* Verify that a student can log in successfully.
* Verify that invalid credentials show an error.
* Verify that searching for “javascript” finds relevant books.
* Verify that an unavailable book cannot be reserved.
* Verify that a student cannot access the admin page.

That keeps the challenge authentic.

---

# My recommendation

Build the app with:

* seeded in-memory state
* reset endpoint
* stable test IDs
* one good student role and one admin role
* 8 books
* 2 users plus admin
* 10–16 planned bugs, activated gradually

That will easily support all 14 sessions.

I can turn this next into a **downloadable markdown project brief** with:

* full app spec
* seed data
* routes
* exact bug checklist
* exact student exercise list by lesson
