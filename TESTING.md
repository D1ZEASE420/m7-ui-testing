# Setting up Playwright for this project

This guide walks you through installing Playwright and writing your first test for the Library Reservation App.

---

## Prerequisites

Make sure the app is running before you start. Open **two terminals**:

**Terminal 1 — backend:**
```bash
cd backend
npm install
node src/server.js
```

**Terminal 2 — frontend:**
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` and confirm you can see the login page.

---

## Step 1 — Install Playwright

From the **project root** (not inside `frontend/` or `backend/`):

```bash
npm install
npx playwright install chromium
```

This installs the `@playwright/test` package and the Chromium browser.

---

## Step 2 — Understand the project structure

```
tests/
  helpers.js        ← pre-built helpers you can import in your tests
playwright.config.js  ← Playwright configuration (baseURL, webServer, etc.)
package.json          ← root package with test scripts
```

> **Note:** `playwright.config.js` is already configured to start the backend and frontend automatically when you run tests, so you don't need to start them manually if you prefer.

---

## Step 3 — Understand the helpers

Open `tests/helpers.js`. It exports:

| Export | What it does |
|--------|-------------|
| `studentTest` | A Playwright `test` variant that logs in as a student before each test |
| `adminTest` | A Playwright `test` variant that logs in as an admin before each test |
| `resetStore` | Resets the backend to its original seed data |
| `STUDENT` | `{ email, password }` for student1 |
| `STUDENT2` | `{ email, password }` for student2 |
| `ADMIN` | `{ email, password }` for the admin |
| `BOOKS` | Object mapping book names to their seed IDs (e.g. `BOOKS.cleanCode === 1`) |
| `RESERVATIONS` | Object mapping reservation names to their seed IDs |

### Seed data at a glance

**Users:**
- `student@test.com` / `test123` — Student One
- `student2@test.com` / `test123` — Student Two
- `admin@test.com` / `admin123` — Admin

**Books (10 total):**
| ID | Title | Status |
|----|-------|--------|
| 1 | Clean Code | Available |
| 2 | Eloquent JavaScript | Available |
| 3 | You Don't Know JS | Available (reserved by student1) |
| 4 | Refactoring | Available |
| 5 | The Pragmatic Programmer | Available |
| 6 | JavaScript: The Good Parts | **Unavailable** |
| 7 | Domain-Driven Design | Available (reserved by student2) |
| 8 | CSS Secrets | **Unavailable** |
| 9 | A Pattern Language | Available |
| 10 | design patterns | Available |

**Reservations:**
| ID | Who | Book |
|----|-----|------|
| 1 | Student One | You Don't Know JS (id=3) |
| 2 | Student Two | Domain-Driven Design (id=7) |

---

## Step 4 — Write your first test

Create a new file in the `tests/` directory, e.g. `tests/login.spec.js`:

```js
import { test, expect } from "@playwright/test";
import { resetStore, STUDENT } from "./helpers.js";

test.beforeEach(async ({ context }) => {
  await resetStore(context);
});

test("user can open login page", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByTestId("login-form")).toBeVisible();
});

test("student can log in with valid credentials", async ({ page }) => {
  await page.goto("/login");
  await page.getByTestId("login-email").fill(STUDENT.email);
  await page.getByTestId("login-password").fill(STUDENT.password);
  await page.getByTestId("login-submit").click();
  await expect(page).toHaveURL("/dashboard");
});
```

For tests that need a logged-in user, use `studentTest` or `adminTest` instead of `test`:

```js
import { expect } from "@playwright/test";
import { studentTest, BOOKS } from "./helpers.js";

studentTest("books page shows all books", async ({ page }) => {
  await page.goto("/books");
  await expect(page.getByTestId("books-list")).toBeVisible();
});
```

> **Important:** When using `studentTest` or `adminTest`, do **not** add a separate `beforeEach` for reset — the fixtures handle reset and login automatically for every test.

---

## Step 5 — Run your tests

```bash
# Run all tests headlessly
npm test

# Open the interactive Playwright UI (great for debugging)
npm run test:ui

# View the HTML report after a run
npm run test:report
```

---

## Step 6 — Useful `data-testid` reference

Use `page.getByTestId("...")` to select elements. Key IDs:

**Login page:**
- `login-form`, `login-email`, `login-password`, `login-submit`, `login-error`

**Navigation:**
- `nav-books`, `nav-my-reservations`, `nav-admin-books`, `nav-admin-reservations`
- `logout-button`, `user-name`, `user-role-badge`

**Dashboard:**
- `dashboard-title`, `dashboard-user-name`

**Books page:**
- `books-list`, `books-search`, `books-category-filter`, `books-availability-filter`, `books-empty`
- `book-card-{id}`, `book-title-{id}`, `book-author-{id}`, `book-status-{id}`
- `book-reserve-{id}`, `book-details-{id}`

**Book details page:**
- `book-detail-title`, `book-detail-author`, `book-detail-category`, `book-detail-status`
- `book-detail-reserve`, `book-detail-back`

**My Reservations page:**
- `reservations-list`, `reservations-empty`
- `reservation-row-{id}`, `reservation-book-title-{id}`, `reservation-cancel-{id}`

**Admin — Books:**
- `admin-books-list`, `admin-book-title`, `admin-book-author`, `admin-book-category`, `admin-book-submit`
- `admin-book-toggle-{id}`

**Admin — Reservations:**
- `admin-reservations-list`

**Shared:**
- `loading-spinner`, `error-message`, `error-retry`, `reservation-toast`

---

## Troubleshooting

**Tests fail with "net::ERR_CONNECTION_REFUSED"**
The app isn't running. Either start it manually (see Prerequisites) or let Playwright start it automatically — make sure you run `npm test` from the project root, not from inside `frontend/` or `backend/`.

**Tests interfere with each other**
Always call `resetStore(context)` at the start of plain `test` blocks. `studentTest` and `adminTest` do this automatically.

**I can't find an element**
Open the app in a browser, right-click the element, and inspect the HTML to find its `data-testid`. You can also use `npm run test:ui` to step through tests visually.
