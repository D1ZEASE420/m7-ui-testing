import { test, expect } from "@playwright/test";
import { studentTest, adminTest } from "./helpers.js";

studentTest("dashboard loads after login", async ({ page }) => {
  // TODO
});

studentTest("student name is shown on dashboard", async ({ page }) => {
  // TODO
});

studentTest("student role badge shows 'student'", async ({ page }) => {
  // TODO
});

studentTest("student sees Books navigation link", async ({ page }) => {
  // TODO
});

studentTest("student sees My Reservations navigation link", async ({ page }) => {
  // TODO
});

adminTest("admin sees admin books navigation link", async ({ page }) => {
  // TODO
});

adminTest("admin sees admin reservations navigation link", async ({ page }) => {
  // TODO
});

adminTest("admin name is shown on dashboard", async ({ page }) => {
  // TODO
});

studentTest("student does NOT see admin navigation links", async ({ page }) => {
  // TODO
});

test("unauthenticated user visiting /dashboard is redirected to login", async ({ page }) => {
  // TODO
});

studentTest("logout clears session and redirects to login", async ({ page }) => {
  // TODO
});

studentTest("after logout, visiting /dashboard redirects to login", async ({ page }) => {
  // TODO
});
