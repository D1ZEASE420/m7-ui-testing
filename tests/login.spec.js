import { test, expect } from "@playwright/test";
import { resetStore, STUDENT, ADMIN } from "./helpers.js";

// Login tests don't need pre-authentication — reset store before each
test.beforeEach(async ({ context }) => {
  await resetStore(context);
});

test.fixme("user can open login page", async ({ page }) => {
  // TODO
});

test.fixme("student can log in with valid credentials", async ({ page }) => {
  // TODO
});

test.fixme("admin can log in with valid admin credentials", async ({ page }) => {
  // TODO
});

test.fixme("successful login redirects to dashboard", async ({ page }) => {
  // TODO
});

test.fixme("empty email shows validation message", async ({ page }) => {
  // TODO
});

test.fixme("empty password shows validation message", async ({ page }) => {
  // TODO
});

test.fixme("wrong password shows invalid credentials error", async ({ page }) => {
  // TODO
});

test.fixme("unknown email shows invalid credentials error", async ({ page }) => {
  // TODO
});

test.fixme("user stays on login page after failed login", async ({ page }) => {
  // TODO
});

test.fixme("already logged-in user visiting /login is redirected to dashboard", async ({ page, context }) => {
  // TODO
});

test.fixme("login button is disabled while request is in progress", async ({ page }) => {
  // TODO
});
