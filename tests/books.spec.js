import { test, expect } from "@playwright/test";
import { studentTest, BOOKS } from "./helpers.js";

studentTest("books page loads", async ({ page }) => {
  // TODO
});

studentTest("all 10 seeded books are displayed", async ({ page }) => {
  // TODO
});

studentTest("each book shows title and author", async ({ page }) => {
  // TODO
});

studentTest("available book has enabled reserve button", async ({ page }) => {
  // TODO
});

studentTest("unavailable book has disabled reserve button", async ({ page }) => {
  // TODO
});

studentTest("unavailable book shows 'Unavailable' status badge", async ({ page }) => {
  // TODO
});

studentTest("available book shows 'Available' status badge", async ({ page }) => {
  // TODO
});

studentTest("clicking details opens the book details page", async ({ page }) => {
  // TODO
});

studentTest("search by exact title works", async ({ page }) => {
  // TODO
});

studentTest("search by partial title works", async ({ page }) => {
  // TODO
});

studentTest("search by author works", async ({ page }) => {
  // TODO
});

studentTest("search is case-insensitive", async ({ page }) => {
  // TODO
});

studentTest("category filter shows only matching books", async ({ page }) => {
  // TODO
});

studentTest("availability filter 'Available' shows only available books", async ({ page }) => {
  // TODO
});

studentTest("availability filter 'Unavailable' shows only unavailable books", async ({ page }) => {
  // TODO
});

studentTest("clearing search input restores full book list", async ({ page }) => {
  // TODO
});

studentTest("resetting category filter to All restores full list", async ({ page }) => {
  // TODO
});

studentTest("no-results empty state shown when search has no matches", async ({ page }) => {
  // TODO
});

test("unauthenticated user visiting /books is redirected to login", async ({ page }) => {
  // TODO
});
