import { test, expect } from "@playwright/test";
import { studentTest, BOOKS } from "./helpers.js";

studentTest("details page shows correct book title", async ({ page }) => {
  // TODO
});

studentTest("details page shows correct author", async ({ page }) => {
  // TODO
});

studentTest("details page shows category", async ({ page }) => {
  // TODO
});

studentTest("details page shows availability status", async ({ page }) => {
  // TODO
});

studentTest("back button returns to books page", async ({ page }) => {
  // TODO
});

studentTest("reserve action works from details page", async ({ page }) => {
  // TODO
});

studentTest("reserve button becomes disabled after reserving", async ({ page }) => {
  // TODO
});

studentTest("unavailable book has disabled reserve button on details page", async ({ page }) => {
  // TODO
});

studentTest("invalid book ID shows error message", async ({ page }) => {
  // TODO
});

test("unauthenticated user cannot access book details page", async ({ page }) => {
  // TODO
});
