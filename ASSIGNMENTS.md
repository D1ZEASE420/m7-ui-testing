# Playwright Testing Assignments

Each assignment asks you to fill in the body of one or more test functions inside the `tests/` directory. The function names describe exactly what the test should verify.

Before you start, read `TESTING.md` for setup instructions and the `data-testid` reference.

---

## Assignment 1 — Login (`tests/login.spec.js`)

**Goal:** Write tests that cover the login flow — both happy paths and failure cases.

**What you'll practice:** navigating to a URL, filling in form fields, clicking buttons, asserting on URL and element visibility.

### Tests to implement

**Positive**
- [ ] `user can open login page`
- [ ] `student can log in with valid credentials`
- [ ] `admin can log in with valid admin credentials`
- [ ] `successful login redirects to dashboard`

**Negative**
- [ ] `empty email shows validation message`
- [ ] `empty password shows validation message`
- [ ] `wrong password shows invalid credentials error`
- [ ] `unknown email shows invalid credentials error`
- [ ] `user stays on login page after failed login`

**Edge**
- [ ] `already logged-in user visiting /login is redirected to dashboard`
- [ ] `login button is disabled while request is in progress`

> **Bugs to find:** Login should redirect to `/dashboard`. Empty password should be caught by validation.

---

## Assignment 2 — Dashboard (`tests/dashboard.spec.js`)

**Goal:** Verify what each user role sees on the dashboard and that navigation links and logout work correctly.

**What you'll practice:** role-based assertions, checking element visibility/absence, logout flow.

### Tests to implement

**Positive**
- [ ] `dashboard loads after login`
- [ ] `student name is shown on dashboard`
- [ ] `student role badge shows 'student'`
- [ ] `student sees Books navigation link`
- [ ] `student sees My Reservations navigation link`
- [ ] `admin sees admin books navigation link`
- [ ] `admin sees admin reservations navigation link`
- [ ] `admin name is shown on dashboard`

**Negative**
- [ ] `student does NOT see admin navigation links`
- [ ] `unauthenticated user visiting /dashboard is redirected to login`
- [ ] `logout clears session and redirects to login`
- [ ] `after logout, visiting /dashboard redirects to login`

> **Bugs to find:** Dashboard shows hardcoded "Admin User" instead of the real logged-in name. Logout button does nothing. Student sees admin nav links when they shouldn't.

---

## Assignment 3 — Books list (`tests/books.spec.js`)

**Goal:** Test the books listing page — rendering, status badges, reserve buttons, and all search/filter combinations.

**What you'll practice:** counting elements, asserting text content, interacting with inputs and select dropdowns.

### Tests to implement

**Positive**
- [ ] `books page loads`
- [ ] `all 10 seeded books are displayed`
- [ ] `each book shows title and author`
- [ ] `available book has enabled reserve button`
- [ ] `unavailable book has disabled reserve button`
- [ ] `unavailable book shows 'Unavailable' status badge`
- [ ] `available book shows 'Available' status badge`
- [ ] `clicking details opens the book details page`

**Search / filter**
- [ ] `search by exact title works`
- [ ] `search by partial title works`
- [ ] `search by author works`
- [ ] `search is case-insensitive`
- [ ] `category filter shows only matching books`
- [ ] `availability filter 'Available' shows only available books`
- [ ] `availability filter 'Unavailable' shows only unavailable books`
- [ ] `clearing search input restores full book list`
- [ ] `resetting category filter to All restores full list`

**Negative**
- [ ] `no-results empty state shown when search has no matches`
- [ ] `unauthenticated user visiting /books is redirected to login`

> **Bugs to find:** Search is case-sensitive. Clearing the search input doesn't restore the full list. The "Unavailable" availability filter causes the spinner to stick forever.

---

## Assignment 4 — Book details (`tests/book-details.spec.js`)

**Goal:** Test the individual book detail page — information display, reserve action, and error handling.

**What you'll practice:** navigating to dynamic routes, asserting status changes, checking disabled state.

### Tests to implement

**Positive**
- [ ] `details page shows correct book title`
- [ ] `details page shows correct author`
- [ ] `details page shows category`
- [ ] `details page shows availability status`
- [ ] `back button returns to books page`
- [ ] `reserve action works from details page`
- [ ] `reserve button becomes disabled after reserving`

**Negative**
- [ ] `unavailable book has disabled reserve button on details page`
- [ ] `invalid book ID shows error message`
- [ ] `unauthenticated user cannot access book details page`

> **Bugs to find:** Book id=6 reserve button stays enabled even when the book is unavailable.

---

## Assignment 5 — Reservations (`tests/reservations.spec.js`)

**Goal:** Test the full reservation lifecycle — viewing, making, cancelling, and edge cases.

**What you'll practice:** multi-step flows, asserting list changes, making direct API calls from tests.

### Tests to implement

**Positive**
- [ ] `my reservations page loads`
- [ ] `seeded reservation is shown for student`
- [ ] `user can reserve available book and it appears in My Reservations`
- [ ] `user can cancel reservation and it disappears from list`
- [ ] `empty state shown when user has no reservations`
- [ ] `reservation count on dashboard reflects seeded reservation`
- [ ] `reservation persists after navigating away and back`

**Negative**
- [ ] `duplicate reservation is blocked`
- [ ] `student only sees their own reservations`
- [ ] `unauthenticated user cannot access my-reservations`

> **Bugs to find:** Cancelling a reservation removes the wrong row (first row instead of the cancelled one). Duplicate reservations are allowed. New reservations don't appear until a full page reload.

---

## Assignment 6 — Admin panel (`tests/admin.spec.js`)

**Goal:** Test admin-only pages for adding books, toggling availability, and viewing reservations — plus access control.

**What you'll practice:** form submission, table row counting, toggling state, cross-page navigation after an action.

### Tests to implement

**Positive**
- [ ] `admin can open admin books page`
- [ ] `admin books list shows all seeded books`
- [ ] `admin can add a valid new book`
- [ ] `newly added book appears in the public books list`
- [ ] `admin can toggle book availability to unavailable`
- [ ] `admin can toggle book availability back to available`
- [ ] `admin can open admin reservations page`
- [ ] `admin reservations page shows all seeded reservations`
- [ ] `admin reservations list shows user names and book titles`

**Negative (form validation)**
- [ ] `empty title is rejected — list count stays at 10`
- [ ] `empty author is rejected — list count stays at 10`

**Access control**
- [ ] `student is blocked from admin books page`
- [ ] `student is blocked from admin reservations page`

> **Bugs to find:** A newly added book doesn't appear in the admin list without a full reload. Students can open `/admin` routes by URL (backend check removed).

---

## Assignment 7 — Authorization (`tests/authorization.spec.js`)

**Goal:** Systematically verify that all routes enforce authentication and role-based access.

**What you'll practice:** testing route guards, asserting redirect URLs.

### Tests to implement

**Unauthenticated redirects**
- [ ] `unauthenticated user visiting / is redirected to login`
- [ ] `unauthenticated user visiting /dashboard is redirected to login`
- [ ] `unauthenticated user visiting /books is redirected to login`
- [ ] `unauthenticated user visiting /my-reservations is redirected to login`
- [ ] `unauthenticated user visiting /admin/books is redirected to login`
- [ ] `unauthenticated user visiting /admin/reservations is redirected to login`

**Student blocked from admin routes**
- [ ] `student visiting /admin/books is shown 403 page`
- [ ] `student visiting /admin/reservations is shown 403 page`

**Admin has full access**
- [ ] `admin can access /dashboard`
- [ ] `admin can access /books`
- [ ] `admin can access /admin/books`

**Session ends after logout**
- [ ] `session ends after logout — API returns 401`
- [ ] `protected page is inaccessible after logout`

> **Bugs to find:** Students can open `/admin` routes by URL because the `requireAdmin` backend check has been removed.

---

## Assignment 8 — UI states (`tests/ui-states.spec.js`)

**Goal:** Test loading spinners, toast notifications, error messages, and error pages.

**What you'll practice:** intercepting network requests with `page.route()`, timing assertions, testing error recovery.

### Tests to implement

**Loading spinner**
- [ ] `loading spinner is shown while books are loading`
- [ ] `loading spinner disappears after books load`

**Toast notifications**
- [ ] `success toast is shown after reserving a book`
- [ ] `success toast disappears after a few seconds`
- [ ] `success toast is shown after reserving from book details page`

**Error states**
- [ ] `error message shown when books API fails`
- [ ] `retry button reloads books after failure`
- [ ] `error message shown when reservations API fails`
- [ ] `toast does NOT appear when reservation API fails`

**404 / 403 pages**
- [ ] `visiting an unknown route shows 404 page`
- [ ] `visiting /403 shows the forbidden page`

> **Bugs to find:** The success toast fires before the API call resolves (shows even when the API fails). The spinner sticks forever when the "Unavailable" filter is active.

---

## Tips

- Use `page.getByTestId("...")` to locate elements — see `TESTING.md` for the full `data-testid` reference.
- Use `studentTest` / `adminTest` for tests that need a logged-in user. These also reset the store automatically.
- For plain `test` blocks, call `resetStore(context)` in `test.beforeEach`.
- Run `npm run test:ui` to debug tests step-by-step in the Playwright UI.
- Some tests will **intentionally fail** on the `buggy` branch — that's expected. Your tests are correct; the app is broken.
