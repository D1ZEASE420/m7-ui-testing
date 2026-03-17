import { test, expect } from "@playwright/test";
import { studentTest, BOOKS, RESERVATIONS } from "./helpers.js";

studentTest.fixme("my reservations page loads", async ({ page }) => {
  // TODO
});

studentTest.fixme("seeded reservation is shown for student", async ({ page }) => {
  // TODO
});

studentTest.fixme("user can reserve available book and it appears in My Reservations", async ({ page }) => {
  // TODO
});

studentTest.fixme("user can cancel reservation and it disappears from list", async ({ page }) => {
  // TODO
});

studentTest.fixme("empty state shown when user has no reservations", async ({ page }) => {
  // TODO
});

studentTest.fixme("reservation count on dashboard reflects seeded reservation", async ({ page }) => {
  // TODO
});

studentTest.fixme("reservation persists after navigating away and back", async ({ page }) => {
  // TODO
});

studentTest.fixme("duplicate reservation is blocked", async ({ page, context }) => {
  // TODO
});

studentTest.fixme("student only sees their own reservations", async ({ page }) => {
  // TODO
});

test.fixme("unauthenticated user cannot access my-reservations", async ({ page }) => {
  // TODO
});
