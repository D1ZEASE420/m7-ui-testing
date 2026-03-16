import { test, expect } from "@playwright/test";
import { studentTest, BOOKS } from "./helpers.js";

studentTest("loading spinner is shown while books are loading", async ({ page }) => {
  // TODO
});

studentTest("loading spinner disappears after books load", async ({ page }) => {
  // TODO
});

studentTest("success toast is shown after reserving a book", async ({ page }) => {
  // TODO
});

studentTest("success toast disappears after a few seconds", async ({ page }) => {
  // TODO
});

studentTest("success toast is shown after reserving from book details page", async ({ page }) => {
  // TODO
});

studentTest("error message shown when books API fails", async ({ page }) => {
  // TODO
});

studentTest("retry button reloads books after failure", async ({ page }) => {
  // TODO
});

studentTest("error message shown when reservations API fails", async ({ page }) => {
  // TODO
});

studentTest("toast does NOT appear when reservation API fails", async ({ page }) => {
  // TODO
});

test("visiting an unknown route shows 404 page", async ({ page }) => {
  // TODO
});

studentTest("visiting /403 shows the forbidden page", async ({ page }) => {
  // TODO
});
