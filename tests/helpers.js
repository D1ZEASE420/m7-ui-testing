import { test as base } from "@playwright/test";

const API = "http://localhost:3001/api";

// Re-login via the test API before each test using the browser context's cookie jar.
// context.request shares cookies with the browser, so the session cookie is set automatically.
async function loginAs(context, role) {
  await context.request.post(`${API}/test/login-as/${role}`);
}

export async function resetStore(context) {
  await context.request.post(`${API}/test/reset`);
}

export const studentTest = base.extend({
  page: async ({ page, context }, use) => {
    await resetStore(context);
    await loginAs(context, "student");
    await use(page);
  },
});

export const adminTest = base.extend({
  page: async ({ page, context }, use) => {
    await resetStore(context);
    await loginAs(context, "admin");
    await use(page);
  },
});

export const STUDENT = { email: "student@test.com", password: "test123" };
export const STUDENT2 = { email: "student2@test.com", password: "test123" };
export const ADMIN = { email: "admin@test.com", password: "admin123" };

export const BOOKS = {
  cleanCode: 1,
  eloquentJs: 2,
  youDontKnowJs: 3,
  refactoring: 4,
  pragmaticProgrammer: 5,
  jsGoodParts: 6,
  ddd: 7,
  cssSecrets: 8,
  longTitle: 9,
  designPatterns: 10,
};

export const RESERVATIONS = {
  student1Book3: 1,
  student2Book7: 2,
};
