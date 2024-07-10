const { test, expect, beforeEach, describe } = require("@playwright/test");
const exp = require("constants");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  /*
Create a new npm project for tests and configure Playwright there.
Make a test to ensure that the application displays the login form by default.
*/

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });
});
