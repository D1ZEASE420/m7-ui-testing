import { test, expect } from "@playwright/test";
import { studentTest, BOOKS, RESERVATIONS } from "./helpers.js";

studentTest("my reservations page loads", async ({ page }) => {
  // TODO
});

studentTest("seeded reservation is shown for student", async ({ page }) => {
  // TODO
});

studentTest("user can reserve available book and it appears in My Reservations", async ({ page }) => {
  // TODO
});

studentTest("user can cancel reservation and it disappears from list", async ({ page }) => {
  // TODO
});

studentTest("empty state shown when user has no reservations", async ({ page }) => {
  // TODO
});

studentTest("reservation count on dashboard reflects seeded reservation", async ({ page }) => {
  // TODO
});

studentTest("reservation persists after navigating away and back", async ({ page }) => {
  // TODO
});

studentTest("duplicate reservation is blocked", async ({ page, context }) => {
  // TODO
});

studentTest("student only sees their own reservations", async ({ page }) => {
  // TODO
});

test("unauthenticated user cannot access my-reservations", async ({ page }) => {
  // TODO
});
