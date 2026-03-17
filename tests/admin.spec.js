import { test, expect } from "@playwright/test";
import { adminTest, studentTest, BOOKS } from "./helpers.js";

adminTest.fixme("admin can open admin books page", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin books list shows all seeded books", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin can add a valid new book", async ({ page }) => {
  // TODO
});

adminTest.fixme("newly added book appears in the public books list", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin can toggle book availability to unavailable", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin can toggle book availability back to available", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin can open admin reservations page", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin reservations page shows all seeded reservations", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin reservations list shows user names and book titles", async ({ page }) => {
  // TODO
});

adminTest.fixme("empty title is rejected — list count stays at 10", async ({ page }) => {
  // TODO
});

adminTest.fixme("empty author is rejected — list count stays at 10", async ({ page }) => {
  // TODO
});

studentTest.fixme("student is blocked from admin books page", async ({ page }) => {
  // TODO
});

studentTest.fixme("student is blocked from admin reservations page", async ({ page }) => {
  // TODO
});
