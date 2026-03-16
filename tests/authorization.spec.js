import { test, expect } from "@playwright/test";
import { studentTest, adminTest } from "./helpers.js";

test("unauthenticated user visiting / is redirected to login", async ({ page }) => {
  // TODO
});

test("unauthenticated user visiting /dashboard is redirected to login", async ({ page }) => {
  // TODO
});

test("unauthenticated user visiting /books is redirected to login", async ({ page }) => {
  // TODO
});

test("unauthenticated user visiting /my-reservations is redirected to login", async ({ page }) => {
  // TODO
});

test("unauthenticated user visiting /admin/books is redirected to login", async ({ page }) => {
  // TODO
});

test("unauthenticated user visiting /admin/reservations is redirected to login", async ({ page }) => {
  // TODO
});

studentTest("student visiting /admin/books is shown 403 page", async ({ page }) => {
  // TODO
});

studentTest("student visiting /admin/reservations is shown 403 page", async ({ page }) => {
  // TODO
});

adminTest("admin can access /dashboard", async ({ page }) => {
  // TODO
});

adminTest("admin can access /books", async ({ page }) => {
  // TODO
});

adminTest("admin can access /admin/books", async ({ page }) => {
  // TODO
});

studentTest("session ends after logout — API returns 401", async ({ page, context }) => {
  // TODO
});

studentTest("protected page is inaccessible after logout", async ({ page }) => {
  // TODO
});
