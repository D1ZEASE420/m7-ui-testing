import { test, expect } from "@playwright/test";
import { studentTest, adminTest } from "./helpers.js";

test.fixme("unauthenticated user visiting / is redirected to login", async ({ page }) => {
  // TODO
});

test.fixme("unauthenticated user visiting /dashboard is redirected to login", async ({ page }) => {
  // TODO
});

test.fixme("unauthenticated user visiting /books is redirected to login", async ({ page }) => {
  // TODO
});

test.fixme("unauthenticated user visiting /my-reservations is redirected to login", async ({ page }) => {
  // TODO
});

test.fixme("unauthenticated user visiting /admin/books is redirected to login", async ({ page }) => {
  // TODO
});

test.fixme("unauthenticated user visiting /admin/reservations is redirected to login", async ({ page }) => {
  // TODO
});

studentTest.fixme("student visiting /admin/books is shown 403 page", async ({ page }) => {
  // TODO
});

studentTest.fixme("student visiting /admin/reservations is shown 403 page", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin can access /dashboard", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin can access /books", async ({ page }) => {
  // TODO
});

adminTest.fixme("admin can access /admin/books", async ({ page }) => {
  // TODO
});

studentTest.fixme("session ends after logout — API returns 401", async ({ page, context }) => {
  // TODO
});

studentTest.fixme("protected page is inaccessible after logout", async ({ page }) => {
  // TODO
});
