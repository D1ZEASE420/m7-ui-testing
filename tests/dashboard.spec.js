import { test, expect } from "@playwright/test";
import { studentTest, adminTest } from "./helpers.js";

studentTest.fixme("dashboard loads after login", async ({ page }) => {
  // TODO
});

studentTest.fixme("student name is shown on dashboard", async ({ page }) => {
  // TODO
});

studentTest.fixme("student role badge shows 'student'", async ({ page }) => {
  // TODO
});

studentTest.fixme("student sees Books navigation link", async ({ page }) => {
  // TODO
});

studentTest.fixme("student sees My Reservations navigation link", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin sees admin books navigation link", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin sees admin reservations navigation link", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin name is shown on dashboard", async ({ page }) => {
  // TODO
});

studentTest.fixme("student does NOT see admin navigation links", async ({ page }) => {
  // TODO
});

test.fixme("unauthenticated user visiting /dashboard is redirected to login", async ({ page }) => {
  // TODO
});

studentTest.fixme("logout clears session and redirects to login", async ({ page }) => {
  // TODO
});

studentTest.fixme("after logout, visiting /dashboard redirects to login", async ({ page }) => {
  // TODO
});
